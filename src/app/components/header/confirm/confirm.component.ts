import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(private _user: UsersService , private act : ActivatedRoute , private router : Router){}

  code:String='';
  rep:String='votre compte a ete confirme ';
  ngOnInit(){
    this.code = this.act.snapshot.paramMap.get('code')!;
    console.log(this.code);

    this._user.verifyAccount(this.code).subscribe(
      
      (res) => {

        console.log(res);
        alert('Votre compte a bien été confirmé ! Vous pouvez vous connecter maintenant.');
      },
      (err) => {
        console.log(err);
        this.rep = err.error ;
        
        
      } 
      
    );
      
  }

}
