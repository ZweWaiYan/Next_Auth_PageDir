
import React from 'react';
import {
    Card,
    Spacer,
    Button,
    Text,
    Input,
    Row,
    Container,
    Grid
} from '@nextui-org/react';
import PocketBase from 'pocketbase';
import router from 'next/router';

export const SignUp = () =>  {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = {
            "email" : event.target.email.value,
            "password": event.target.password.value,                        
            "passwordConfirm": event.target.comfirm_pw.value,                     
        }

        const newRecord = await pb.collection('users').create(data);

        // console.log("newRecord" , newRecord);     

        const verification = await pb.collection('users').requestVerification(event.target.email.value);

        // console.log("verification" , verification);

        if(verification === true){
            const data = {
                emailVisibility : true,
                verified : true
            }
            const updatedrecord = await pb.collection('users').update(newRecord.id, data);
            // console.log("updatedrecord" , updatedrecord);        
        }    
    }

    const changeRoute = () => {
        router.push("/");
    }
    
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
                            Create New User
                        </Text>
                        <Spacer y={1} />
                        <Input
                            name='email'
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Email"
                            css={{ mb: '6px' }}
                        />
                        <Spacer y={1} />
                        <Input
                            name='password'
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Password"
                            css={{ mb: '6px' }}
                        // contentLeft={}
                        />
                        <Spacer y={1} />
                        <Input
                            name='comfirm_pw'
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Comfirm Password"
                            css={{ mb: '6px' }}
                        // contentLeft={}
                        />
                        <Spacer y={2} />
                        {/* <Row justify="space-between">
                        <Button style={{}}>Sign in</Button>
                        <Button style={{}}>Cancel</Button>
                    </Row> */}
                        <Row justify="space-between">
                            <Button onClick={changeRoute} auto>Cancel</Button>
                            <Spacer x={0.5} />
                            <Button onClick={changeRoute} type='submit' auto>Sign in</Button>
                        </Row>
                    </form>
                </Card>
            </Container>
        </div>
    );
}