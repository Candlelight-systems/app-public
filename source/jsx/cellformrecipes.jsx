import React from 'react';
import { buildTrackerURL, postJSON } from '../../app/util/fetch';

class CellFormRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = { recipes: {} };
    this.fetchRecipes(this.props);
    this.loadRecipe = this.loadRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
  }

  loadRecipe() {
    const recipeName = this.props.recipe;
    const recipe = this.state.recipes[recipeName];
    for (var i in recipe) {
      this.props.onFormChange(i, recipe[i]);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.onFormChange(name, value);
  }

  componentDidUpdate() {}

  componentWillReceiveProps(nextProps) {
    this.fetchRecipes(nextProps);
  }

  fetchRecipes(props) {
    fetch(buildTrackerURL(props.tracker, 'recipes.get'))
      .then(d => {
        return d.json();
      })
      .then(json => {
        this.setState({ recipes: json });
      });
  }

  saveRecipe() {
    const props = Object.assign({}, this.props);

    delete props.tracker;

    for (var i in props) {
      if (i == parseInt(i)) {
        delete props[i];
      }
    }
    delete props.cellName;
    delete props.recipeRemove;
    delete props.recipeSave;
    delete props.recipe;
    delete props.instrumentId;
    delete props.chanId;
    delete props.measurementName;
    delete props.enable;

    postJSON(buildTrackerURL(this.props.tracker, 'recipes.save'), {
      recipeName: this.props.recipeSave,
      recipe: props
    })
      .then(d => {
        return d.json();
      })
      .then(json => {
        this.setState({ recipes: json });
      });
  }

  removeRecipe() {
    fetch(
      buildTrackerURL(this.props.tracker, 'recipes.remove') +
        '?recipeName=' +
        this.props.recipeRemove
    )
      .then(d => {
        return d.json();
      })
      .then(json => {
        this.setState({ recipes: json });
      });
  }
  render() {
    const recipeOptions = [];
    for (var i in this.state.recipes) {
      recipeOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return (
      <div>
        <div className="form-group">
          <label className="col-sm-3">Load a recipe</label>
          <div className="col-sm-9">
            <div className="input-group">
              <select
                name="recipe"
                className="form-control"
                value={this.props.recipe}
                onChange={this.handleInputChange}>
                <option>Select a recipe...</option>
                {recipeOptions}
              </select>
              <span className="input-group-btn">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={this.loadRecipe}>
                  Load
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-3">Saving as recipe</label>
          <div className="col-sm-9">
            <div className="input-group">
              <input
                type="text"
                name="recipeSave"
                id="recipeSave"
                className="form-control"
                value={this.props.recipeSave}
                onChange={this.handleInputChange}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={this.saveRecipe}>
                  Save
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3">Remove a recipe</label>
          <div className="col-sm-9">
            <div className="input-group">
              <select
                name="recipeRemove"
                className="form-control"
                value={this.props.recipeRemove}
                onChange={this.handleInputChange}>
                <option>Select a recipe...</option>
                {recipeOptions}
              </select>
              <span className="input-group-btn">
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={this.removeRecipe}>
                  Remove
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CellFormRecipes;
