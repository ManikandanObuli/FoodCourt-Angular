import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-res-offers',
  templateUrl: './res-offers.component.html',
  styleUrls: ['./res-offers.component.css']
})
export class ResOffersComponent {
  dummyArray:any=[];
  hotelCount=0;
  realTime:any=[];
  value:any;
constructor(private delTime:DatabaseService, private router:Router){
this.read_deltime();
}

read_deltime(){
  this.delTime.read_hotels().subscribe(x=>{
    this.dummyArray=x;
    this.hotelCount=this.dummyArray.length;
    var del=[];
    var del1=[];
    for(var i=0;i< this.hotelCount;i++){
       del[i]=this.dummyArray[i].offer;
       del1[i]=del[i];
    }
    // del=del.sort();
    for(var i=0;i< this.hotelCount;i++){
      for(var j=0;j< this.hotelCount;j++){
        if(del[i]==""){
          del[i]="cleared";
        }
      }
    }
    console.log(del);
    var m=0;
    for(var i=0;i< this.hotelCount;i++){
      var index=0;
      for(var j=0;j< this.hotelCount;j++){
        if(del[i]==del1[i]){
          index=del1.indexOf(del[i]);
          del1[index]="";
          this.realTime[m++]=this.dummyArray[index];
          break;
        }
      }
    }
});
}

sendHotel(index:any){
  // this.delTime.getHotelName(this.realTime[index]);
  this.value=JSON.stringify(this.realTime[index]);
  localStorage.setItem('hotelDetails',this.value);
  this.router.navigateByUrl("/dishPage");
}
}
