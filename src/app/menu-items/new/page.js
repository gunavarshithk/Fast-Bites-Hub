'use client';
import {useProfile} from '@/components/useProfile'
import toast from "react-hot-toast";
import UserTabs from "../../../components/layout/UserTabs";
import { useState } from "react";
import Link from "next/link";
import Left from '../../../components/icons/Left';
import {redirect} from "next/navigation";
import MenuItemForm from "../../../components/layout/MenuItemForm";

export default function NewMenuItemPage(){
    const {loading,data}=useProfile();
    const [redirectToItems,setRedirectToItems]=useState(false);

    async function handleFormSubmit(ev,data){
        ev.preventDefault();
        const savingPromise=new Promise(async(resolve,reject)=>{
            const response=await fetch('/api/menu-items',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        })
        if(response.ok){
            resolve();
        }
        else{
            reject();
        }
    })
    await toast.promise(savingPromise, {
        loading: 'Saving this tasty item',
        success: 'Saved',
        error: 'Error',
    });

    setRedirectToItems(true);
}
    if(redirectToItems){
        return redirect('/menu-items');
    }
    if(loading){
        return 'loading user info';
    }
    if(!data.admin){
        return 'Not an Admin';
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className='max-w-2xl mx-auto mt-8'>
                <Link href={'/menu-items'} className='button'>
                    <span>
                        Show All Menu Items
                    </span>
                    <Left/>
                </Link>
            </div>
           <MenuItemForm onSubmit={handleFormSubmit} menuItem={null}/>
        </section>
    );
}