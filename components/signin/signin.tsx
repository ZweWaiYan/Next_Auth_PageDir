import React, { useEffect, useState } from 'react';
import {
    Card,
    Spacer,
    Button,
    Text,
    Input,
    Row,
    Checkbox,
    Container,
    Image
} from '@nextui-org/react';
import PocketBase from 'pocketbase';
import router, { Router } from 'next/router';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function SignIn() {

    // useEffect(() => {
    //     pb.authStore.loadFromCookie(document.cookie);
    //     if(pb.authStore.isValid){
    //         router.push("/");
    //     }
    // } , [])

    const [values, setValues] = useState({ email: "", password: "" });    

    //new
    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })

    }

    const changeRoute = () => {
        console.log("work");
        router.push("/signup");
    }

    const forgetPwHandle = () => {
        
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault(); // prevent the form from reloading the page
        
        try {
            const authData = await pb.collection("users").authWithPassword(values.email, values.password);
            if (authData) {
                document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
                // router.push("/");
                router.push("/homePage");
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div>
            <Container
                display="flex"
                alignItems="center"
                justify="center"
                css={{ minHeight: '100vh' }}
            >
                <Card css={{ mw: '420px', p: '20px' }} variant="bordered">
                    <form onSubmit={handleSubmit}>
                        <Text
                            size={24}
                            weight="bold"
                            css={{
                                as: 'center',
                                mb: '20px',
                            }}
                        >
                            Login
                        </Text>
                        <Input
                            name="email"
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Email"
                            css={{ mb: '6px' }}
                            onChange={(event) => handleChange(event)}
                        />
                        <Spacer y={1} />
                        <Input
                            name="password"
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Password"
                            css={{ mb: '6px' }}
                            type="password" // change the input type to hide the password
                            onChange={(event) => handleChange(event)}
                        />
                        <Spacer y={2} />
                        <Row justify="space-between">
                            {/* <Checkbox>
                                    <Text size={14}>Remember me</Text>
                            </Checkbox> */}                            
                            <Text onClick={changeRoute} size={14}>Create New User</Text>
                            <Text onClick={forgetPwHandle} size={14}>Forgot password?</Text>
                        </Row>
                        <Spacer y={1} />
                        <Button type='submit'>Sign in</Button>
                        <Spacer y={1} />
                    </form>
                </Card>
            </Container>
        </div>
    );
}
