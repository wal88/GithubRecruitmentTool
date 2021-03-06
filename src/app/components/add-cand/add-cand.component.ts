import {Component, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../../models/Candidate';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { CandidateService} from '../../services/candidate.service';
import { GithubService } from "../../services/github.service";
import {EmailService} from "../../services/email.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../services/auth.service";

/**
 * @add-cand.component.ts
 * Provides functionality to add a new candidate to be assessed.
 * Saving details candidate to DB and setting up a GitHub repo for them
 */
@Component({
  selector: 'app-add-cand',
  templateUrl: './add-cand.component.html',
  styleUrls: ['./add-cand.component.css']
})
export class AddCandComponent implements OnInit, OnDestroy {
  name: string;
  email: string;
  githubID: string;
  problem: string;
  candidate: Candidate;
  candidates:  Observable<any[]>;
  subscriptions: any[];

   constructor(public flashMessageService: FlashMessagesService,
              public router: Router,
              public githubService: GithubService,
              public candidateService: CandidateService,
              private emailService: EmailService,
              public authService: AuthService) {
    this.problem = 'Origin-Technical-Challenge';
    this.subscriptions = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    // check that all fields are entered
    let errorMessage = this.isUndefinedOrEmpty(this.name) ? "Please enter the name of the Candidate":
                       this.isUndefinedOrEmpty(this.email) ? "Please enter candidate's email":
                       !this.contains(this.email, ['@','.']) ? "Please enter a correct email address":
                       this.isUndefinedOrEmpty(this.githubID) ? "Please enter the candidate's Github ID":
                       this.isUndefinedOrEmpty(this.problem) ? "Please select a code problem for this candidate":
                       "noFormErrors";

    // If there is an error in the form, display the error message and stop
    if (errorMessage != "noFormErrors"){
      this.flashMessageService.show(errorMessage, {cssClass: 'alert-danger', timeout: 3000});
      return;
    }

    // Create the a new Candidate object for new candidate, need authservice to get Adder's email
    let firstSubscribe = true;
    this.subscriptions.push( this.authService.getAuth().subscribe( user => {
      //console.log(user);

      this.candidate = {
        name: this.name,
        email: this.email.toLowerCase(),
        githubID: this.githubID.toLowerCase(),
        problem: this.problem,
        repositoryName: 'code-challenge-' + this.githubID,
        progressStatus: 'Doing',
        adder: user.email.toLowerCase(),
        timestamp: Date.now(),
        reviews: ''
      };

      // Now need to check if the Github Id is already in use in our system
      let candidateGithubExists = false;

      this.subscriptions.push(this.candidateService.getCandidates().subscribe(candidateList => {
        // Check if this GithubId is being used my another candidate
        // Only allow first execution of subscribe to work
        if (!firstSubscribe) {
          return;
        }
        firstSubscribe = false;
        for (let candidate of candidateList) {
          if (candidate.githubID != undefined && candidate.githubID == this.githubID) {
            candidateGithubExists = true;
            this.flashMessageService.show('This github ID ' + candidate.githubID + ' is already registered to a candidate', {
              cssClass: 'alert-danger',
              timeout: 5000
            });
            break;
          }
        }

        //if github id is not being used by another candidate, successfully add it and make repo
        if (!candidateGithubExists) {
          //console.log("Adding candidate now..");

          // Email candidate
          this.emailService.sendCandidateEmail(this.candidate);
          this.createCandidateRepo(this.candidate);

          // Persist the candidate
          this.candidateService.newCandidate(this.candidate);

          // Adding candidate succesful
          this.flashMessageService.show('New candidate added!', {cssClass: 'alert-success', timeout: 2000});
          this.router.navigate(['/']);
        }
      }));
    }));
  }

  // Call this function after emailing to Create a repo and add candidate
  createCandidateRepo(candidate: Candidate) {
    //console.log('inside createRepo');
    this.githubService.addCandidate(this.candidate);
  }

  /**
   * Check if a string is null or underfined or size 0
   * @param {string} stringToCheck
   * @returns {boolean}
   */
  isUndefinedOrEmpty(stringToCheck: string) {
    if (stringToCheck === undefined || stringToCheck === null || stringToCheck.trim().length === 0) {
      return true;
    }
    return false;
  }

  /**
   * Check if a string contains all characters in a given array
   * @param stringToCheck
   * @param array
   * @returns {boolean}
   */
  contains(stringToCheck, array) {
    for (let item of array) {
      if (stringToCheck.indexOf(item) === -1) {
        return false;
      }
    }
    return true;
  }

  /**
   * Destroy Firebase subscriptions when finished
   */
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions){
      if (subscription !== undefined) {
        subscription.unsubscribe();
      }
    }
  }
}
