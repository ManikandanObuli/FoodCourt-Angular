import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


signInPage:boolean=true;
signUpPage:boolean=false;
forgotPasswordPage:boolean=false;


passwordCheck:any;
confirmPasswordCheck:any;
ForgotConfirmpasswordCheck:any;
ForgotpasswordCheck:any;
isPasswordChecked:boolean=true;
isForgotPasswordChecked:boolean=true;


register:FormGroup;
login:FormGroup;
forgotPassword:FormGroup;
returl:any;

  constructor(fb:FormBuilder, private data_ser:DatabaseService, private router:Router,private route:ActivatedRoute){
    this.route.queryParamMap.subscribe(w=>{
      this.returl=w.get('returl');
      console.log(this.returl);
    })

    this.login=fb.group({
      loginPhoneNumber:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      loginPassword:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
    });


    this.forgotPassword=fb.group({
      forgotPhone:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      forgotPass:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      forgotConfirm:['',[Validators.required]]
    });


    this.register= fb.group({
      username:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{3,15}$")]],
      phonenumber:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$")]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      ConfirmPassword:['',[Validators.required]]});
  }



  PasswordChecker():boolean{
    if(this.passwordCheck===this.confirmPasswordCheck){
      this.isPasswordChecked=true;
    }
    else{
      this.isPasswordChecked=false;
    }
    return this.isPasswordChecked;
  }

  ForgotPasswordChecker():boolean{
    if(this.ForgotConfirmpasswordCheck===this.ForgotpasswordCheck){
      this.isForgotPasswordChecked=true;
    }
    else{
      this.isForgotPasswordChecked=false;
    }
    return this.isForgotPasswordChecked;
  }

  SignIn(){
    this.signInPage=true;
    this.signUpPage=false;
    this.forgotPasswordPage=false;
  }

  SignUp(){
    this.signInPage=false;
    this.signUpPage=true;
    this.forgotPasswordPage=false;
  }

  ForgotPassPage(){
    this.signInPage=false;
    this.signUpPage=false;
    this.forgotPasswordPage=true;
  }

  Close(){
    this.router.navigateByUrl("/");
  }


  SaveData(){
    this.data_ser.save_data(this.register.value);

    this.router.navigateByUrl("/");
  }

  SendData(){
    this.data_ser.read_data(this.login.value,this.returl);
}


}
