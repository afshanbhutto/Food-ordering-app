import classes from './AvailableMeals.module.css';
import MealItem from "./MealItem/MealItem";
import Card from '../UI/Card';
import { useEffect, useState } from 'react';


//Now we don't need it becuase we are loading it from firebase
// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

const AvailableMeals = () => {

    //also to manage the loaded fata we need a state
    const [meals,setMeals] = useState([],);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    // using useEffect for fetching data from firebase
    useEffect(()=>{
        
        //as we are fetching data from firebase and  it will return a  promise therefore  we have to make it async , but we can not directly do it
        // therefor we are using an other funtion inside useEffect and make it async await to get rid of promise returned
        const fetchData = async () =>{
            const response = await fetch('https://food-order-app-361cc-default-rtdb.firebaseio.com/meals.json');

            //checking for error
            if(!response.ok){
                throw new Error("Something went on wrong!");
            }

            const responseData = await response.json();

            // the response data will return a nested object but we data in array format therefore we are changing 
            // object data  in array
            const loadedData = [];

            for(const key in responseData){
                loadedData.push({
                    id: key,
                    name : responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            setMeals(loadedData);
            setIsLoading(false);
        };

        fetchData().catch(error =>{
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    //checking if loading
    if(isLoading){
        return(
            <section className={classes.mealIsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    //checking for if error occured
    if(httpError){
        return(
            <section className={classes.mealError}>
                <p>{httpError}</p>
            </section>
        )
    }
    const mealsList = meals.map((meal) =>{
        return <MealItem 
                  id={meal.id}
                  key={meal.id} 
                  name={meal.name} 
                  description={meal.description} 
                  price={meal.price}/>
    });
    

    return(
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;