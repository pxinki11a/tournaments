"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByTournamentsParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Tournaments from '../database/models/tournaments.model';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'rub',
            unit_amount: price,
            product_data: {
              name: order.tournamentTitle
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        tournamentId: order.tournamentId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    
    const newOrder = await Order.create({
      ...order,
      tournament: order.tournamentId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EVENT
export async function getOrdersByTournament({ searchString, tournamentId }: GetOrdersByTournamentsParams) {
  try {
    await connectToDatabase()

    if (!tournamentId) throw new Error('tournament ID is required')
    const tournamentObjectId = new ObjectId(tournamentId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'tournaments',
          localField: 'tournament',
          foreignField: '_id',
          as: 'tournament',
        },
      },
      {
        $unwind: '$tournament',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          tournamentTitle: '$tournament.title',
          tournamentId: '$tournament._id',
          buyer: {
            $concat: ['$buyer.username'],
          },
        },
      },
      {
        $match: {
          $and: [{ tournamentId: tournamentObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('tournament._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'tournament',
        model: Tournaments,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id username',
        },
      })

    const ordersCount = await Order.distinct('tournament._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}