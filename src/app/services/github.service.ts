import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Candidate} from "../models/Candidate";

interface Repo {
  name: string;
  url: string;
  full_name: string;
  subscribers_url: string;
}

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) { }

  addCandidate(candidate: Candidate) {
    this.createRepository(candidate).subscribe(data => {
      this.importRepository(data, candidate).subscribe( res => {
        console.log(res);
      });
    });
  }
  createRepository(candidate: Candidate) {
    console.log('Creating repository');

    const headers = new HttpHeaders().set('Authorization', 'token ' + '9f7fa497acff70abc90ea8c4419bd35495615ba0');
    const body = {
      name: 'code-challenge-' + candidate.githubID,
      description: 'MYOB technical challenge for ' + candidate.name,
      private: false,   //False for now since we dont have any private repos for the general acc
      has_issues: true,
      has_projects: true,
      has_wiki: true
    };

    console.log({headers});
    return this.http.post('https://api.github.com/user/repos', body, {headers});
  }

  importRepository(response: any, candidate: Candidate) {
    console.log(response);

    console.log('Importing repository');

    const headers = new HttpHeaders().set('Authorization', 'token ' + '9f7fa497acff70abc90ea8c4419bd35495615ba0').set('Accept', 'application/vnd.github.barred-rock-preview');
    const body = {
      vcs: "git",
      vcs_url: 'https://github.com/nfuseuoa/' + candidate.problem + '.git'
    };

    console.log({headers});
    return this.http.put('https://api.github.com/repos/nfuseuoa/' + response["name"] + '/import', body, {headers});
  }

  getCandidateList() { // token: 9f7fa497acff70abc90ea8c4419bd35495615ba0
    console.log('called');
    const headers = new HttpHeaders().set('Authorization', 'token ' + '9f7fa497acff70abc90ea8c4419bd35495615ba0');
    const body = {name: 'This is my repository'};
    console.log({headers});
    // return this.http.post<Repo[]>('https://api.github.com/user/repos', body, {headers});
    return this.http.get<Repo[]>('https://api.github.com/user/repos', {headers});
    // this.repos$ = this.http.get<Repo[]>("https://api.github.com/user/repos", {headers}).map(data => _.values(data)).do(console.log);
    // this.http.get("https://api.github.com/user/repos", {headers}).subscribe(val => console.log(val));
  }

}
