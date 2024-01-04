import {
  FETCH_CAT_FACT_LIST_REQUEST, FETCH_CAT_FACT_LIST_SUCCESS, FETCH_CAT_FACT_LIST_FAILURE, FETCH_UPDATE_PAGE
} from '../actions/cat_fact';

const initialState = {
  facts: {
    list: [],
    current_page: 1,
    first_page_url: '',
    last_page_url: '',
    last_page: 0
  },
  loading: false,
  error: null,
};

const addKittenImg = (list) => {
  let index = 0;
  for(let cat_fact of list){
    //need to restart after 16 images due to the limitation of the api itself
    let num = index - Math.floor(index/16)*16 + 1;
    cat_fact.img = `http://placekitten.com/300/300?image=${num}`;
    index++;
  }

  return list;
}


const cat_fact_reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAT_FACT_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CAT_FACT_LIST_SUCCESS:

      let completed_list = addKittenImg(action.payload.data)
      return { 
        ...state, 
        facts: {
          list: [...state.facts.list, ...completed_list], 
          current_page: action.payload.current_page,
          first_page_url: action.payload.first_page_url,
          last_page_url: action.payload.last_page_url,
          last_page: action.payload.last_page,
        },
        loading: false };
    case FETCH_CAT_FACT_LIST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case FETCH_UPDATE_PAGE:
      return { ...state, facts: { ...state.facts, current_page : action.payload}, loading: false };
    default:
      return state;
  }
};

export default cat_fact_reducer;
