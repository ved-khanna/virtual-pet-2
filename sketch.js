var dog,happydog
var database, foodS, foodStock 

var feedDog, addFood

var lastFed, fedTime 

var foodOBJ

function preload()
{
  regDog=loadImage("Dog.png")
  happyDog=loadImage("happydog.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodOBJ= new Food() 
  dog = createSprite(250,250,20,30)
  dog.addImage(regDog)
  dog.scale=0.1
  foodStock=database.ref('food')
  foodStock.on("value",readStock)
  feedDog=createButton("Feed the dog")
  feedDog.position(230,400)
  feedDog.mousePressed(feedTheDog)
  addFood=createButton("Add food")
  addFood.position(270,400)
  addFood.mousePressed(AddFood)
}


function draw() {  
background(46, 139, 87)
  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
  fill(255,255,254)
  textSize(15)
  if (lastFed>=12) {
    text("LastFeed:"+lastFed%12+"PM",350,30)
  }
  else if(lastFed==0){
    text("LastFeed:12AM",350,30)
  }
  else{
    text("lastFeed:"+lastFed+"AM",350,30)
  }
/*if (keyWentDown(UP_ARROW)) {
  foodS=foodS-1
  writeStock(foodS)
  dog.addImage(happyDog)
}*/
drawSprites();
  //add styles here
}
function readStock(data){
  foodS=data.val()
  foodOBJ.updateFoodStock(foodS)
}
/*function writeStock(x) {
  database.ref('/').update({
    food:x
  })
  
}*/
function FedDog() {
  dog.addImage(happydog)
  if (foodOBJ.getFoodStock()<=0) {
    foodOBJ.updateFoodStock(foodOBJ.getFoodStock()*0)
  }
  else{ foodOBJ.updateFoodStock(foodOBJ.getFoodStock()*-1)}
  database.ref('/').update({
    food:foodOBJ.getFoodStock(),
    fedTime:hour()
  })
}
function addFoods() {
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}




