import React,{useState,useEffect,useContext} from 'react'
import Loader from 'react-loader-spinner'
import {UserContext} from '../../../App'
import { useParams  } from "react-router-dom";

const Profile = ()=> {


    const[userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
         
            setProfile(result)
        })
     },[])
     const followUser = ()=>{
        fetch("/follow",{
            method:"put",
            headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           },
           body:JSON.stringify({
               followId:userid
           })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:data
                }
            })
        })
    }



   


    return (
       <>
        {userProfile ?
        
        
        <div style={{
            maxWidth:"550px",margin:"0px auto"
        }}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"

            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src="https://instagram.fkhi2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/33322403_1511327815661713_7310469237590458368_n.jpg?_nc_ht=instagram.fkhi2-1.fna.fbcdn.net&_nc_ohc=NqfklR4PdMUAX9GV1pQ&oh=6c04544b816dee5133a8f57ab2043808&oe=5F67DCDA"
                    />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:'108%'
                    }}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>followUser()}>Follow</button>
                </div>
            </div>
        
        <div className="gallery">
            {
                userProfile.posts.map(item=>{
                    return(
                       
                       <img key={item._id} className="item" src={item.photo}  alt={item.title} />
                    )
                })
            }
                   
       </div>
        
        </div>
        
        
        :<div style={{
                display: "flex",
                  width: "100%",
                   height: "400",
                   justifyContent:"center",
                   alignItems:"center",
                
                 }}> 
                <Loader type="TailSpin" color="black" height={195} width={195} timeout={7000}/>
                
                
                </div>
     
     }
       
        
        </>
    )
}

export default Profile
