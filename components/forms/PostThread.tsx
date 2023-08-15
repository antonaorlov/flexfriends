"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserValidation } from "@/lib/validations/user";
import { isBase64Image } from "@/lib/utils";
import {useUploadThing} from '@/lib/uploadthing';
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname,useRouter } from "next/navigation";
import path from "path";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
interface props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}


const PostThread = ({userId}:{userId:string}) => {
  
    const router = useRouter()
    const pathname = usePathname()
  
  
    const form = useForm<z.infer<typeof ThreadValidation>>({
      resolver: zodResolver(ThreadValidation),
      defaultValues: {
        thread:'',
        accountId:userId,
      },
    });
    const onSubmit = async(values: z.infer<typeof ThreadValidation>)=>{
        await createThread(
        {
            text: values.thread,
            author: userId,
            communityId:null,
            path:pathname

        
        })
        router.push("/")
        
    }
  return (
    <>
    <h1>Post Thread Form  </h1>
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={16}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
         Post Thread
        </Button>
        </form>
        </Form>
    </>
    
  )
}

export default PostThread