
import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';

import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllTournaments } from '@/lib/actions/tournaments.actions';
import { SearchParamProps } from '@/types';

import Image from 'next/image'
import Link from 'next/link'

import Carousel from '@/components/shared/Carousel';


export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const tournaments = await getAllTournaments({
    query: searchText,
    category,
    page,
    limit: 6
  })
  
const images = [ 
    '/assets/images/rl.png',
    '/assets/images/lol.png',
    '/assets/images/wot.png',
    '/assets/images/trackmania.png',
    '/assets/images/dota2.png',
    
];


  return (
    <>
    
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Упростите управление и участитем в турнирах</h1>
            <p className="p-regular-20 md:p-regular-24">Присоединяйтесь миллионам пользователей, которые уже доверяют нам для управления своими турнирами.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#tournaments">
                Перейти к турнирам
              </Link>
            </Button>
          </div>

          <div className="app">
      
      <Carousel images={images} />
    </div>

 

        </div>
      </section> 

      <section id="tournaments" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Доступные <br /> Турниры</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={tournaments?.data}
          emptyTitle="Турниры не найдены"
          emptyStateSubtext="Вы можете создать свой турнир"
          collectionType="All_Tournaments"
          limit={6}
          page={page}
          totalPages={tournaments?.totalPages}
        />
      </section>
    </>
      
  );
  }


