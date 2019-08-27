Mono-Repo using Lerna, Yarn Workspaces and Angular


Enable yarn workspaces:
`yarn config set workspaces-experimental true`

Create directory
`mkdir mono-repo-angular && cd mono-repo-angular`

Create angular project
`ng new lerna-demo --create-application=false`

Then ini
`yarn init`

Delete the package-lock file as we will be using yarn and not npm

Add lerna as dev dependency
`yarn add lerna --save-dev`

Init lerna dependency
`lerna init --independent`

Modify lerna.json as:
``
{
 "packages": [
   "projects/*"
 ],
 "version": "independent",
 "npmClient": "yarn",
 "useWorkspaces": true
}
``
 


Add package installer to the dev dependencies
`yarn install ng-packagr tsickle --save-dev`

Update package.json and add following keys in the file
 ``
 "workspaces": [
   "projects/*"
 ],
 ``



Add application in the repository
`ng g app app-one`

Add package.json in the app folder and add scripts for serve, test, lint and build
``
{
 "name": "@dashboards/app-one",
 "version": "0.0.1",
 "scripts": {
   "start": "ng serve",
   "build": "ng build",
   "test": "ng test",
   "lint": "ng lint"
 },
 "peerDependencies": {
   "@angular/common": "^7.1.0",
   "@angular/core": "^7.1.0"
 }
}
``
 


Add library in the rep
`ng g lib shared`

Modify the package.json as follows:
``
{
 "name": "@dashboards/shared",
 "version": "0.0.1",
 "scripts": {
   "start": "ng serve",
   "test": "ng test",
   "lint": "ng lint",
   "build": "ng-packagr -p package.json"
 },
 "peerDependencies": {
   "@angular/common": "^7.1.0",
   "@angular/core": "^7.1.0"
 },
 "ngPackage": {
   "lib": {
     "entryFile": "src/packages.ts"
   },
   "dest": "../../dist/shared-lib"
 }
}
``

Add following scripts in the root package json file
``
"scripts": {
   "ng": "ng",
   "start": "lerna run start --scope=@dashboards/app-one --stream",
   "build": "lerna run build --stream",
   "build-lib": "lerna run build --scope=@dashboards/shared --stream",
   "test": "ng test",
   "lint": "ng lint",
   "e2e": "ng e2e"
 }
``

Now you can build the file as:
`yarn run build-lib`

Add the shared file as dependency in app
`lerna add @dashboards/shared`

Then run
 `	lerna bootstrap `
to install the dependencies in the projects

Then open app-one, app.module.ts 
and add import statement 
and declare the module

``
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppComponent } from './app.component';
import { SharedModule, SharedService } from 'shared';
 
@NgModule({
 declarations: [
   AppComponent
 ],
 imports: [
   BrowserModule,
   SharedModule
 ],
 providers: [
   SharedService
 ],
 bootstrap: [AppComponent]
})
export class AppModule { }
``


Then you can use the shared component inside the application

And use 

`yarn start`

The application works…!


