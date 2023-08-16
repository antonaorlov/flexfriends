"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommentValidation } from "@/lib/validations/thread";
import { usePathname,useRouter } from "next/navigation";
import { addCommentToThread, fetchThreadById } from "@/lib/actions/thread.actions";

interface Props{
    author:string
    threadId:string,
    currentUserImg:string,
    currentUserId:string
}
const Comment = ({author,threadId,currentUserImg,currentUserId}:Props) =>{
    const router = useRouter()
    const pathname = usePathname()
    const form = useForm<z.infer<typeof CommentValidation>>({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread:'',
      },
    });
    const onSubmit = async(values: z.infer<typeof CommentValidation>)=>{
        await addCommentToThread(threadId,values.thread, JSON.parse(currentUserId),pathname)
        form.reset()
        
    }
  return (
    <>
    <Form {...form}>
      <form
        className="comment-form"
        onSubmit={form.handleSubmit(onSubmit)}
        
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                    src={currentUserImg}
                    alt="Profile Picture"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder={`reply to ${author.toLowerCase()}`}
                  className="no-focus text-light-1 outline-none "
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
         Post
        </Button>
        </form>
        </Form>
    </>
  )
}

export default Comment