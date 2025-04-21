"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils' 
import { useRouter } from 'next/navigation'
import { vapi } from '@/lib/vapi-sdk'
import { callbackify } from 'util'


enum  CallStatus {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    CONNECTING= 'connecting',
    FINISHED= 'finished',
}

interface SavedMessage {
    role: "user" | "assistant" | "system"
    content: string;
}




const Agent = ({userName, userId, type}: AgentProps) => {
    const router = useRouter()

    const [isSpeaking, setisSpeaking] = useState(false)
    const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [messages, setMessages] = useState<string[]>([])
    const [isLoading, setisLoading] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const OnCallStart = () => setcallStatus(CallStatus.ACTIVE)
        const OnCallEnd = () => setcallStatus(CallStatus.FINISHED)
         

    const onMessage = (message:Message) => {
        if(message.type ==== 'transcript' && message.transcriptType === "final") {
            const newMessage = {role: messages.role, content: message.content}

            setMessages((prev) => [...prev, newMessage])
        }

    }
        const OnSpeechStart = () =>  setIsSpeaking(true)
        const OnSpeechEnd = () => setIsSpeaking(false)


        const OnError = (error: Error) => console.log('Error',error);


        vapi.on('call:start', OnCallStart);
        vapi.on('call:end', OnCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', OnSpeechStart);
        vapi.on('speech-end', OnSpeechEnd);
        vapi.on('error', OnError);


            return () => {
                vapi.off('call:start', OnCallStart);
                vapi.off('call:end', OnCallEnd);
                vapi.off('message', onMessage);
                vapi.off('speech-start', OnSpeechStart);
                vapi.off('speech-end', OnSpeechEnd);
                vapi.off('error', OnError);
            }


    }, [])

    useEffect(() => {
        if(callStatus === CallStatus.FINISHED) Router.push('/');

    }, [messages, callStatus, type, userId ])

    const handleCall = async () => {}
    


  return (
    <>
        <div className='call-view'>
            <div className='card-interviewer'>
                <div className="avatar">
                    <Image src="/ai-avatar.png" 
                    alt="Vapi"
                    width={65}
                    height={54}
                    className="object-cover"/>
                    {isSpeaking && <span className='animate-speak'/>}
                </div>
                <h3>Bogey The AI Interviwer</h3>
            </div>

            <div className='card-border'>
                <div className='card-content'>
                    <Image src="/user-avatar.png"
                    alt="user avater"
                    width={540}
                    height={540}
                    className="rounded-full object-cover
                    size-[120px]"/>
                        <h3>{userName}</h3>
                </div>
            </div>
        </div>
        {messages.length > 0 && (
            <div className='transcript-border'>
                <div className='transcript'>
                    <p key={lastMeassage} className={cn(
                        'transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100'
                    )}>
                        {lastMeassage}
                    </p>


                </div>
            </div>
        )}



        <div className="w-full flex justify-center">
            {callStatus !== CallStatus.ACTIVE ? (
                <button className='relative btn-call'>
                    <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== CallStatus.CONNECTING && 'hidden')}
                      />
                      <span>
                          {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? 'Call' :  '...'} 
                      </span>
                </button>
            ) : (
                <button className='btn-disconnect'>
                    End
                </button>
            )}   
        </div>
    </>
        
  )
}

export default Agent