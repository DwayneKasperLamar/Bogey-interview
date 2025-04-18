import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'


const page = () => {
  return (
    <>
        <section className='card-cta'>
            <div className='flex flex-col gap-6 max-w-lg'>
                <h2>Get Interview-Ready With Ai Powered Practice & Feedback</h2>
                <p className='text-lg'></p>

                <Button asChild className='btn-primary max-sm:w-full'>
                    <Link href="/interview"> Start Interview Practise</Link>
                </Button>
            </div>
            <Image src='/robot.png' 
            alt='robo-dude'
             width={400}
              height={400}
              className='max-sm:hidden' />
        </section>



        <section className='flex flex-col gap-6 mt-8'>
            <h2>your Interview</h2>
            <div className='interviews-section'>
                {dummyInterviews.map((interview) => (
                    <InterviewCard {... interview} key={interview.id} />
                ))}
            </div>
        </section>


        <section className='flex flex-col gap-6 mt-8'>
            <h2>Take Interview Now</h2>

            <div className='interviews-section'>
               {dummyInterviews.map((interview) => (
                    <InterviewCard {... interview} key ={interview.id} />
                ))}
            </div>
        </section>
    </>
  )
}

export default page