import React, { Component } from 'react';
import { Result, Layout, Icon, Spin, Row, Col, Button, Typography, Divider } from 'antd';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Content style={{ textAlign: 'center' }}>
                    <Row>
                        <Col span={18}>
                            <Typography>
                                <Content style={{padding:'40px 30px'}}>
                                    <Title style={{ fontFamily:'Baloo Bhai', fontSize:30 }}>About Us</Title>
                                </Content>
                                    <Content style={{padding:'10px 16px'}}>
                                    <Title style={{ fontFamily:'Open Sans', fontSize:24 }}>Creators</Title>
                                    <Title style={{ fontFamily:'Open Sans', fontSize:20 }}>Alejandro Araya</Title>
                                    <Title style={{ fontFamily:'Open Sans', fontSize:20 }}>Santiago Gonzalo</Title>
                                    <Title style={{ fontFamily:'Open Sans', fontSize:20 }}>Timothy Salinas</Title>

                                </Content>
                                
                                <Paragraph>
                                   Our passion is to provide the top possible matches between employer and contractor in any industries. <br/>
          We have a foundational belief that creating relationships and connecting people is what move companies and employees forward. <br/>
                                               <br/>
                                               <br/>                     
                                </Paragraph>
                            </Typography>
                        </Col>

                    </Row>

                    <Row gutter={[0, 32]}>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button 
                                type="link" 
                                target="_blank"
                                icon="github" 
                                style={{ fontSize: '24px' }} 
                                href='https://github.com'                            
                            />
                            <Button 
                                type="link" 
                                target="_blank"
                                icon="mail" 
                                style={{ fontSize: '24px', marginLeft: 8 }}
                                href='mailto:@gmail.com' 
                            />
                            <Button 
                                type="link" 
                                target="_blank"
                                icon="twitter" 
                                style={{ fontSize: '24px', marginLeft: 8 }} 
                                href="https://www.twitter.com"
                            />

                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}
export default About;