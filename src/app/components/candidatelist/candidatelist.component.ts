import { Component, OnInit, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AddReviewersComponent } from '../add-reviewers/add-reviewers.component';
import { EditCanComponent } from '../edit-can/edit-can.component';
import { Candidate } from '../../models/Candidate';
import { Reviewer } from '../../models/Reviewer';

import { CandidateService } from '../../services/candidate.service';
import {Observable} from "rxjs/Observable";
import {GithubService} from "../../services/github.service";
import {ActivatedRoute, Router} from "@angular/router";

interface Repo {
  name: string;
  url: string;
  full_name: string;
  subscribers_url: string;
}

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {
  dialogRef: MdDialogRef<AddReviewersComponent>;
  dialogRef2: MdDialogRef<EditCanComponent>;
  repos$: Observable<Repo[]>;
  candidates: any[];

  // Fetch all candidate from the database
  //candidates: Candidate[];

  constructor(
    public dialog: MdDialog,
    public githubService: GithubService,
    public candidateService: CandidateService,
    public route: Router
  ){
    //this.repos$ = this.githubService.getCandidateList();

  }

  ngOnInit() {
      // this.githubService.getCandidateList().subscribe(candidates => {
      // this.candidates = candidates;
      // });
      this.candidateService.getCandidates().subscribe(candidates =>{
        this.candidates = candidates;
      });
  }

  viewResults(githubId: string){
      this.route.navigate(['results', githubId]);
  }

  openDialog(id: string) {
    this.dialogRef = this.dialog.open(AddReviewersComponent, {
      width:'1px',height:'1px'});
      var hideShadow = document.getElementsByClassName('mat-dialog-container')[0].setAttribute('style', 'padding:0');
       var indentifierDiv =  document.getElementById("identifier");
      indentifierDiv.innerHTML = id;
    }

  editCan(){
    this.dialogRef2 = this.dialog.open(EditCanComponent,{
      width:'1px',height:'1px'});
      var hideShadow = document.getElementsByClassName('mat-dialog-container')[0].setAttribute('style', 'padding:0');
  }
}
