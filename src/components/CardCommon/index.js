import { Card, Button } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom'


  class TabsCard extends React.Component {
    state = {
      key: 'tab1',
      noTitleKey: '',
    };
  
    onTabChange = (key, type) => {
      this.setState({ [type]: key });
    };

    getMore = () => {
        this.props.getMore()
    }
  
    componentWillMount() {
        this.setState({
            noTitleKey: this.props.tabListNoTitle[0].key
        })
    }

    render() {
        const { contentListNoTitle,  tabListNoTitle } = this.props
      return (
        <div>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={this.state.noTitleKey}
            tabBarExtraContent={<Button type="link" onClick={this.getMore}>More</Button>}
            onTabChange={key => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            {contentListNoTitle[this.state.noTitleKey]}
          </Card>
        </div>
      );
    }
  }

  export default withRouter(TabsCard)