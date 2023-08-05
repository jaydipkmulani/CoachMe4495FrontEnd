
const Uid=JSON.parse(localStorage.getItem("currentUser"))?._id;
console.log(Uid)
export const INITIAL_STATE = {
  userId:Uid ,
  title: "",
  courseCategory: "Accounting",
  coverImage: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  duration: 0,
  numberOfClass: 0,
  features: [],
  price: 0,
};

export const courseReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        images: action.payload.images,
      };
    case "ADDCOVER_IMAGES":
      return {
        ...state,
        coverImage: action.payload.coverImage,
        
      };
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
