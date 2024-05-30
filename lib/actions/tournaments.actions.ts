'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Category from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'

import {
  CreateTournamentsParams,
  UpdateTournamentsParams,
  DeleteTournamentsParams,
  GetAllTournamentsParams,
  GetTournamentsByUserParams,
  GetRelatedTournamentsByCategoryParams,
} from '@/types'
import Tournaments from '../database/models/tournaments.model'

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateTournament = (query: any) => {
  return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

// CREATE
export async function createTournament({ userId, tournament, path }: CreateTournamentsParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findById(userId)
    if (!organizer) throw new Error('Organizer not found')

    const newTournament = await Tournaments.create({ ...tournament, category: tournament.categoryId, organizer: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newTournament))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE EVENT BY ID
export async function getTournamentById(tournamentId: string) {
  try {
    await connectToDatabase()

    const tournament = await populateTournament(Tournaments.findById(tournamentId))

    if (!tournament) throw new Error('Tournament not found')

    return JSON.parse(JSON.stringify(tournament))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateTournament({ userId, tournament, path }: UpdateTournamentsParams) {
  try {
    await connectToDatabase()

    const tournamentToUpdate = await Tournaments.findById(tournament._id)
    if (!tournamentToUpdate || tournamentToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or tournament not found')
    }

    const updatedTournament = await Tournaments.findByIdAndUpdate(
      tournament._id,
      { ...tournament, category: tournament.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedTournament))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteTournament({ tournamentId, path }: DeleteTournamentsParams) {
  try {
    await connectToDatabase()

    const deletedTournament = await Tournaments.findByIdAndDelete(tournamentId)
    if (deletedTournament) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL EVENTS
export async function getAllTournaments({ query, limit = 6, page, category }: GetAllTournamentsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const tournamentsQuery = Tournaments.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const tournaments = await populateTournament(tournamentsQuery)
    const tournamentsCount = await Tournaments.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(tournaments)),
      totalPages: Math.ceil(tournamentsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET EVENTS BY ORGANIZER
export async function getTournamentsByUser({ userId, limit = 6, page }: GetTournamentsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const tournamentsQuery = Tournaments.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const tournaments = await populateTournament(tournamentsQuery)
    const tournamentsCount = await Tournaments.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(tournaments)), totalPages: Math.ceil(tournamentsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedTournamentsByCategory({
  categoryId,
  tournamentId,
  limit = 3,
  page = 1,
}: GetRelatedTournamentsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: tournamentId } }] }

    const tournamentsQuery = Tournaments.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const tournaments = await populateTournament(tournamentsQuery)
    const tournamentsCount = await Tournaments.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(tournaments)), totalPages: Math.ceil(tournamentsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}