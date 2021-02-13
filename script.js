//Search button click event function
document.getElementById('btn-search').addEventListener('click', function () {
    const searchMeal = document.getElementById('search-meal').value;
    if (searchMeal == "") {     
        document.getElementById('show-error').style.display = 'block';
    } else {
        displayInputDish(searchMeal);
    }
    document.getElementById('meals-list').innerHTML = "";
    document.getElementById('meal-details').innerHTML = "";
});

//Function to display searched food item
function displayInputDish(input) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res => res.json())
        .then(data => displayDishes(data.meals))
        .catch(error => document.getElementById('show-error').style.display = 'block');
}

//Display foods function
const displayDishes = meals => {
    const mealsDiv = document.getElementById('meals-list');
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';
        const mealInfo = `
            <div onclick="showMeals('${meal.strMeal}')">
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3> </div>`;
        mealDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(mealDiv);
        document.getElementById('show-error').style.display = 'none';
    });
}

//Fucntion to show meal details
const showMeals = meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMealDetails(data.meals[0]))
}

//Function to show ingredients of selected meal 
const showMealDetails = meal => {
    const mealDiv = document.getElementById('meal-details');
    mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <h6>Ingredients:</h6>
        <ul>
        <li> >${meal.strIngredient1}</li>
        <li> > ${meal.strIngredient2}</li>
        <li> > ${meal.strIngredient3}</li>
        <li> > ${meal.strIngredient4}</li>
        <li> > ${meal.strIngredient5}</li>
        <li> > ${meal.strIngredient6}</li>
        <li> > ${meal.strIngredient7}</li>
        <li> > ${meal.strIngredient8}</li>
        <li> > ${meal.strIngredient9}</li>
        <li> > ${meal.strIngredient10}</li>
        </ul>
        `;
}
