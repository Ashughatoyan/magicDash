type stateType = { token: string | null, id: number }
type actionType = { token?: string | null , id?: number, type: string }

const initialState : stateType = { token: localStorage.getItem('token'), id:0 }

export function rootReducer(state = initialState , action: actionType){
    switch( action.type ){
      case 'signIn':
        return { ...state, token: action.token }
      case 'signOut':
        return { ...state, token: null }
      default: return state
    }
  };

export const login = async function(){
    const promise = await fetch('http://localhost:3001/login', {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            "email" : "ashughatoyan@gmail.com",
            "password" : "eab4cb824458901841728321"
        })
    })
    
    return promise.json()
}
