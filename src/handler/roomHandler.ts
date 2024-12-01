import { Socket } from "socket.io";
import { v4 } from "uuid";
import IRoomParams from './../interfaces/IRoomParams';


//below maps stores the obbject of the roomId to the all teh users present in the room
const rooms:Record<string,string[]> ={};

const roomHandler=(socket:Socket)=>{

 

 const createRoom=()=>{
  const roomId=v4();

  socket.join(roomId);
  rooms[roomId]=[];
  socket.emit("room-created",{roomId});
 };

 const joinedRoom=({roomId,peerId}:IRoomParams)=>{
 
  if(rooms[roomId]){
   console.log("Room joined",roomId,"with peerId",peerId);
   //joining the user in the room
   rooms[roomId].push(peerId);
   socket.join(roomId);

   //below events is used for logging the user from the giuven room id
   socket.emit("get-users",{
    roomId,
    participants:rooms[roomId]
   })

  }
 };

 // the above two functions will be called when the client will send the socket to the server to create the room

 socket.on("create-room",createRoom);
 socket.on("joined-room",joinedRoom);

};


export default roomHandler;