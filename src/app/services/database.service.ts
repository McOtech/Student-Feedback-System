import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Faculty {
  id: number;
  name: string;
  code: string;
  description: string;
  password: string;
}

export interface Question {
  id: number;
  facultyId: number;
  statement: string;
}

export interface Answer {
  id: number;
  questionId: number;
  statement: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getFaculties() {
    return this.http.get<Faculty[]>(`/api/faculties`);
  }
  getFaculty(id: number) {
    return this.http.get<Faculty>(`/api/faculties/${id}`);
  }
  storeFaculty({name, code, password, description}) {
    return this.http.post(`/api/faculties`, {
      name, code, password, description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  updateFaculty({id, name, code, password, description}) {
    return this.http.patch(`/api/faculties/${id}`, {
      name, code, password, description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  destroyFaculty(id: number) {
    return this.http.delete(`/api/faculties/${id}`);
  }

  getQuestions() {
    return this.http.get<Question[]>(`/api/questions`);
  }
  getFacultyQuestions(id: number) {
    return this.http.get<Question[]>(`/api/faculties/${id}/questions`);
  }
  getQuestion(id: number) {
    return this.http.get<Question>(`/api/questions/${id}`);
  }
  storeQuestion({facultyId, statement}) {
    return this.http.post(`/api/questions`, {
      facultyId, statement
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  updateQuestion({id, facultyId, statement}) {
    return this.http.patch(`/api/questions/${id}`, {
      facultyId, statement
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  destroyQuestion(id: number) {
    return this.http.delete(`/api/questions/${id}`);
  }

  getAnswers() {
    return this.http.get<Answer[]>(`/api/answers`);
  }
  getQuestionAnswers(questionId) {
    return this.http.get<Answer[]>(`/api/questions/${ questionId }/answers`);
  }
  getAnswer(id: number) {
    return this.http.get<Answer>(`/api/answers/${id}`);
  }
  storeAnswer({questionId, statement}) {
    return this.http.post(`/api/answers`, {
      questionId, statement
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  updateAnswer({id, questionId, statement}) {
    return this.http.patch(`/api/answers/${id}`, {
      questionId, statement
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  destroyAnswer(id: number) {
    return this.http.delete(`/api/answers/${id}`);
  }
  // Authentication
  registerUser({code, password}) {
    return this.http.post(`/api/students`, {
      code, password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  loginUser({category, code, password}) {
    return this.http.post(`/api/login`, {
      category, code, password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  isUserLoggedIn() {
    return this.http.get(`/api/isloggedin`);
  }
  logoutUser() {
    return this.http.post(`/api/logout`, {

    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
