import React from 'react';

import { Nav, NavLink, TabContainer, TabContent, TabPane } from 'react-bootstrap';

interface TabItem {
    title: string;
    content: React.ReactNode;
}

interface CustomTabsProps {
    tabs: TabItem[];
    defaultActiveKey?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, defaultActiveKey }) => {
    return (
        <TabContainer defaultActiveKey={defaultActiveKey || tabs[0]?.title}>
            <Nav variant="tabs">
                {tabs.map((tab) => (
                    <NavLink key={tab.title} eventKey={tab.title}>
                        {tab.title}
                    </NavLink>
                ))}
            </Nav>

            <TabContent className="border border-top-0 p-3">
                {tabs.map((tab) => (
                    <TabPane key={tab.title} eventKey={tab.title}>
                        {tab.content}
                    </TabPane>
                ))}
            </TabContent>
        </TabContainer>
    );
};

export default CustomTabs;
