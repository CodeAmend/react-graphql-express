import React from 'react';
import { useMutation } from 'react-apollo';

import { ADD_RECIPE } from '../../queries';


const AddRecipe = ({ history }) => {
  const [form, setForm] = React.useState({
    name: '',
    category: '',
    description: '',
    instructions: '',
  });

  const handleSubmit = () => {
    const { name, category, description, instructions } = form;
    const isInvalid = !name || !category || !description || !instructions

    if (!isInvalid) {
      // const { username } = session.getCurrentUser;
      submitAddRecipeMutation({ variables: {
        name,
        category,
        description,
        instructions,
        username: '', 
      }});
      history.push('/');
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm(old => ({
      ...old,
      [name]: value,
    }))
  }

  const [submitAddRecipeMutation, { error }] = useMutation(ADD_RECIPE);
  if (error) console.error(error);

  return (
    <div className="App">
      <h2 className="App">Add Recipe</h2>
      <form className="form">
        <input
          name="name"
          type="text"
          placeholder="Add name of recipe"
          value={form.name}
          onChange={handleChange}
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <input
          name="description"
          type="text"
          placeholder="Add description"
          value={form.description}
          onChange={handleChange}
        />
        <textarea
          name="instructions"
          placeholder="Add instructions"
          value={form.instructions}
          onChange={handleChange}
        />
        <button onClick={handleSubmit} type="button">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;
