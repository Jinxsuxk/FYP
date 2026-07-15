import { supabase } from "../supabase/client";


export async function getEquipment(){

    const {data,error}=await supabase
        .from("equipment")
        .select("*")
        .order("created_at",{ascending:false});


    if(error)
        throw error;


    return data;

}



export async function addEquipment(equipment){

    const {data,error}=await supabase
        .from("equipment")
        .insert(equipment)
        .select();


    if(error)
        throw error;


    return data;

}



export async function deleteEquipment(id){

    const {error}=await supabase
        .from("equipment")
        .delete()
        .eq("id",id);


    if(error)
        throw error;

}