import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit, OnDestroy {

  loadedRecipe: Recipe;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log('ngonit');
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        //redirect 
        this.router.navigate(['./recipeId'])
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipeService.getRecipe(recipeId);
    });
  }

  ionViewWillEnter(){
    //this.recipes = this.recipesService.getAllRecipes();
    console.log('ionview will enter');   
  }

  ionViewDidEnter(){
    console.log('ionview did enter');   
  }

  ionViewWillLeave(){
    console.log('ionview will leave');   
  }

  ionViewDidLeave(){
    console.log('ionviewdid leave');   
  }
ngOnDestroy(){
  console.log('ngondestroy');
}


  onDeleteRecipe() {
    this.alertCtrl.create({
      header: "Are u sure?", message: "really delete ?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.recipeService.deleteRecipe(this.loadedRecipe.id);
          this.router.navigate(['./recipes']);
        }
      }]
    })
    .then(alertEl => {
      alertEl.present();
    });
    
  }
}
