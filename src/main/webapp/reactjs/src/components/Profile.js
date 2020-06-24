import './stylesheet.css';
import React, { Component } from 'react';
import ListPosts from './ListProducts';
import { getUserProfile } from './APIUtils';
import { Avatar, Tabs } from 'antd';
import { getAvatarColor } from './Colors';
import { formatDate } from './Helpers';
import LoadingIndicator  from './LoadingIndicator';
import NotFound from './NotFound';
import ServerError from './ServerError';

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        };
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                    {this.state.user ? (
                        <div className="user-profile">
                            <h1 className=" jumbotron bg-dark text-white text-center">Hello {this.state.user.name}, how are you today?</h1>
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name), width:80, height:80}}>
                                        <h1 id="avatarname" className="text-white">{this.state.user.name[0].toUpperCase()}</h1>
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <h4 className="full-name text-white">{this.state.user.name} ({this.state.user.id})</h4>
                                    <h5 className="username text-white">@{this.state.user.username}</h5>
                                    <div className="user-joined text-white">
                                        Joined {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>
                            </div> <br/>
                            <div className="user-poll-details">
                                <Tabs defaultActiveKey="1"
                                      animated={false}
                                      tabBarStyle={tabBarStyle}
                                      size="large"
                                      className="profile-tabs text-white">
                                    <TabPane tab="List of your added products" key="1">
                                        <ListPosts username={this.props.match.params.username} />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    ): null
                    } </div>
        );
    }
}

export default Profile;