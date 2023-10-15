import React, { useLayoutEffect, useState } from "react";
import { useSettingStore } from "../store/setting";
import {
  Badge,
  Divider,
  JumboTabs,
  SearchBar,
  Slider,
  Space,
  Switch,
  TabBar
} from "antd-mobile";
import {
  AppOutline,
  MessageFill,
  MessageOutline,
  UnorderedListOutline,
  UserOutline
} from "antd-mobile-icons";

const Index = () => {
  const { isDarkMode, setIsDartMode } = useSettingStore();
  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-prefers-color-scheme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <>
      <Space align="center">
        <div>Dark Mode</div>
        <Switch checked={isDarkMode} onChange={setIsDartMode} />
      </Space>

      <JumboTabs defaultActiveKey="1">
        <JumboTabs.Tab title="Espresso" description="描述文案" key="1">
          1
        </JumboTabs.Tab>
        <JumboTabs.Tab title="Coffee Latte" description="描述文案" key="2">
          2
        </JumboTabs.Tab>
        <JumboTabs.Tab title="Cappuccino" description="描述文案" key="3">
          3
        </JumboTabs.Tab>
        <JumboTabs.Tab title="Americano" description="描述文案" key="4">
          4
        </JumboTabs.Tab>
        <JumboTabs.Tab title="Flat White" description="描述文案" key="5">
          5
        </JumboTabs.Tab>
        <JumboTabs.Tab title="Caramel Macchiato" description="描述文案" key="6">
          6
        </JumboTabs.Tab>
        <JumboTabs.Tab title="Cafe Mocha" description="描述文案" key="7">
          7
        </JumboTabs.Tab>
      </JumboTabs>

      <Slider defaultValue={40} />

      <SearchBar placeholder="请输入内容" showCancelButton />

      <TabBar>
        {tabs.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
    </>
  );
};

const tabs = [
  {
    key: "home",
    title: "首页",
    icon: <AppOutline />,
    badge: Badge.dot
  },
  {
    key: "todo",
    title: "我的待办",
    icon: <UnorderedListOutline />,
    badge: "5"
  },
  {
    key: "message",
    title: "我的消息",
    icon: (active: boolean) => (active ? <MessageFill /> : <MessageOutline />),
    badge: "99+"
  },
  {
    key: "personalCenter",
    title: "个人中心",
    icon: <UserOutline />
  }
];

export default Index;
