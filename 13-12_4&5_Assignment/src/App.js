import './App.css';
import { useState, useEffect } from 'react';
import Card from './Card';
import ToDoList from './ToDoList';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const carData = `
    [
      {"cID": 1, "cName": "Maruti Fronx", "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.", "image": "images/car1.jpg", "price": "7,51,000"},
      {"cID": 2, "cName": "Mahindra Scorpio N", "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.", "image": "images/car2.jpg", "price": "13,60,000"},
      {"cID": 3, "cName": "Maruti Fronx", "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.", "image": "images/car3.jpg", "price": "7,60,000"},
      {"cID": 4, "cName": "Mahindra Scorpio", "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.", "image": "images/car4.jpg", "price": "13,84,000"},
      {"cID": 5, "cName": "Hyundai Creta", "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.", "image": "images/car5.jpg", "price": "11,00,000"},
      {"cID": 6, "cName": "Maruti Grand Vitara", "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.", "image": "images/car5.jpg", "price": "10,80,000"},
      {"cID": 7, "cName": "Hyundai Exter", "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.", "image": "images/car5.jpg", "price": "6,13,000"}
    ]
    `;

    try {
      const carArray = JSON.parse(carData);
      setCars(carArray);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }, []);

  return (
    <div>
      {/* <ToDoList/> */}
       <h1>Cars List:</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {cars.map((car, index) => (
          <Card key={index} car={car} />
        ))}
      </div> 
    </div>
  );
}

export default App;
