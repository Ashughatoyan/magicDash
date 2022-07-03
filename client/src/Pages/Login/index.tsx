import React,{ useState } from 'react';
import { Box } from "@mui/system";
import { TextField,  Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { login } from '../../app/toolkit';

login().then( imp => console.log(imp) )

type LoginContainerState = {
    email:string,
    password:string,
    emailErr:boolean,
    passwordErr:boolean,
    alert: { show:boolean, asserition:boolean, message:string },
    loading:boolean
}

function sendReq( email:string, password:string, setState: React.Dispatch<React.SetStateAction<LoginContainerState>> ):void{
    if( password.length < 6 ){
        setState( prevState  => ({ 
            ...prevState,
            password:'',
            passwordErr:true,
            alert:{ show:true, asserition:false, message:'Wrong! password' },
        }))
    };
    if( !email.toLowerCase().match(/^\S+@\S+\.\S+$/) ){
        setState( prevState  => ({ 
            ...prevState,
            email:'',
            emailErr:true,
            alert:{ show:true, asserition:false, message:'Wrong! E-mail' },
        }))
    }
    else if( password.length >= 6 ){
        setState( prevState  => ({ 
            ...prevState,
            alert:{ show:true, asserition:true, message:'waiting server answer' },
            loading:true
        }))
        console.log('success')
    }
}

const LoginContainer : React.FC = () => {
    
    const [ state, setState ] = useState<LoginContainerState>({ 
        email:'',
        password:'',
        emailErr:false,
        passwordErr:false,
        alert:{ show:false, asserition:true, message:'' },
        loading:false
    })

    return(
        <Box sx={{ width:'30vw', marginTop:'5vw' }}>
            <Stack spacing={2} direction="column" sx={{ alignItems: 'center' }}>
                <TextField
                    onChange={ (e) => { 
                        setState( prevState => ({ ...prevState, email:e.target.value, emailErr:false })) 
                    }}
                    error={state.emailErr}
                    label="E-mail"
                    size="small"
                    variant="standard"
                    sx={{ width:'80%' }}
                />
                <TextField
                    onChange={ (e) => { 
                        setState( prevState => ({ ...prevState, password:e.target.value, passwordErr:false })) 
                    }}
                    error={state.passwordErr}
                    label="Password"
                    type="password"
                    size="small"
                    variant="standard"
                    sx={{ width:'80%' }}
                />
                <LoadingButton
                    variant="contained"
                    loading={state.loading}
                    onClick={ () => { sendReq( state.email, state.password, setState ) } }
                    sx={{ 
                        width:'80%',
                        backgroundColor: 'rgb(23,127,255)', 
                        '&:hover':{
                            backgroundColor: 'rgb(65, 145, 245)',
                            color:'rgb(194, 224, 255)'
                        }
                    }}
                >
                    Sign In
                </LoadingButton>
                { state.alert.show?
                    <Alert 
                        severity={ state.alert.asserition?"success":"error" }
                        color={ state.alert.asserition?"info":"error" }
                        sx={{ width:"72%" }}
                    >
                        { state.alert.message }
                    </Alert>:
                    false
                }
            </Stack>
        </Box>
    )
}

export default LoginContainer;