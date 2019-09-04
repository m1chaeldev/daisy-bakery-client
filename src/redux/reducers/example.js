import update from "immutability-helper";

const initialState = {
  count: 1
};
export default (state = initialState, action) => {
  switch (action.type) {
    // case "TANG_LEN":
    //   return update(state, {
    //     count: { $set: state.count + 1 }
    //   });

    case "GIAM_XUONG":
      return update(state, {
        count: { $set: state.count - 1 }
      });
    default:
      return state;
  }
};