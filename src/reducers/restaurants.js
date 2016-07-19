const initialState = {
  restaurants: [
    {
      name: 'test'
    },
    {
      name: 'another test'
    }
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
