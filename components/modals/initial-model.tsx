"use client";
// import every which zod library by importing like that
import * as z from 'zod'
import { useForm } from 'react-hook-form';
// zod library to handle form same like formik library gor validation
import {zodResolver} from "@hookform/resolvers/zod"

import {
    Form,FormControl,FormField,FormItem,FormLabel,FormMessage
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

import {
Dialog,
DialogContent,
DialogDescription,
DialogFooter,
DialogHeader,
DialogTitle
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react';
// we creating form schema
const formSchema=z.object({
    name:z.string().min(1,{
        message:"Server name is required"
    }),
    imageUrl:z.string().min(1,{
        message:"Server image is required"
    })
})
const InitialModal = () => {
    const [isMounted,setIsMounted]=useState(false)


    useEffect(()=>{
        // to solve hydration of ui in next js with 
       setIsMounted(true)
    },[])
    // just hook of react 18
    const form=useForm({
        // we define defaultvalues of form with useForm hook
        // we call zod resolver
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            imageUrl:""
        }
    })
    // coming from form state which these things
    const isLoading=form.formState.isSubmitted
   const onSubmit=async(values:z.infer<typeof formSchema>)=>{
       console.log(values);
   }
   if(!isMounted){
    return null
   }
    return ( 
        <Dialog open>
            {/* coming from ui folder i install these file of ui from shand/cn ui library */}
         <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6'>
            <DialogTitle className='text-2xl text-center'>
                Customize your server
            </DialogTitle>
            <DialogDescription className='text-center text-zinc-500'>
                Give your server a personality with a name and an image.you always
                chnage it later
            </DialogDescription>
            </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                     className='space-y-8'
                    >
                        <div className='space-y-8 px-6'>
                         <div className='flex item-center justify-center text-center'>
                            TODO:Image Upload
                         </div>
                         <FormField
                        //  coming from useForm hook of react
                          control={form.control}
                          name="name"
                          render={({field})=>{
                            return (
                                <FormItem>
                                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'> 
                                      Server Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black
                                        focus-visible:ring-offset-0
                                        '
                                        placeholder='Enter server Name'
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )
                          }}
                         />
                        </div>
                      <DialogFooter className='bg-gray-100 px-6 py-4'>
                        <Button disabled={isLoading} variant={'primary'}>
                            Create
                        </Button>
                        </DialogFooter>   
                    </form>
                </Form>         
         </DialogContent>
            
        </Dialog>
     );
}
 
export default InitialModal;