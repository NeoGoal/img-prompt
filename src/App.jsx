import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Layout, Row, Col, Typography, Menu, Grid } from "antd";
import {
  BgColorsOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  GithubOutlined,
} from "@ant-design/icons";

import "antd/dist/reset.css";
import tagsData from "./prompt.json";
import ObjectSection from "./components/ObjectSection";
import AttributeSection from "./components/AttributeSection";
import TagSection from "./components/TagSection";
import SelectedTagsSection from "./components/SelectedTagsSection";
import ResultSection from "./components/ResultSection";

const { useBreakpoint } = Grid;
const { Title } = Typography;

const getAttributes = (currentObject, data) => {
  return Object.keys(data[currentObject]);
};

const App = () => {
  const objects = Object.keys(tagsData);
  const [activeObject, setActiveObject] = useState(objects[0]);
  const attributes = getAttributes(activeObject, tagsData);

  const [activeAttribute, setActiveAttribute] = useState(attributes[0]);
  const [selectedTags, setSelectedTags] = useState([]);
  const screens = useBreakpoint();

  useEffect(() => {
    const attributes = getAttributes(activeObject, tagsData);
    setActiveAttribute(attributes[0]);
  }, [activeObject]);

  const handleObjectClick = (object) => {
    setActiveObject(object);
  };

  const handleAttributeClick = (attribute) => {
    setActiveAttribute(attribute);
  };
  const updateSelectedTags = (tag, attribute) => {
    const isSelected = selectedTags.some(
      (t) => t.displayName === tag.displayName
    );

    if (isSelected) {
      return selectedTags.filter((t) => t.displayName !== tag.displayName);
    } else {
      return [...selectedTags, { ...tag, attribute }];
    }
  };

  const handleTagClick = (tag, attribute) => {
    setSelectedTags(updateSelectedTags(tag, attribute));
  };

  return (
    <Layout>
      <Helmet>
        <title>圆圆AI实验室：图像魔法</title>
        <meta
          name="description"
          content="用于 Stable Diffusion 和 Midjourney 的图像提示词生成"
        />
        <meta name="keywords" content="圆圆AI，prompt, 图像魔法, 提示词" />
      </Helmet>
      <Layout.Header>
        <Row justify="space-between" align="middle" gutter={16}>
          <Col xs={20} sm={18} md={16}>
            <Menu mode="horizontal" theme="dark" selectedKeys={["1"]}>
              <Menu.Item key="1" icon={<BgColorsOutlined />}>
                图像魔法
              </Menu.Item>
              <Menu.Item key="3" icon={<ExperimentOutlined />}>
                <a
                  href="https://mf.yuanyuanai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ChatGPT魔法提示词
                </a>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}
      >
        <Title
          level={2}
          style={{
            marginBottom: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          圆圆AI--图像提示词
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={18}>
            <h3 className="m-2 font-bold">对象选择区</h3>
            <ObjectSection
              objects={objects}
              activeObject={activeObject}
              onObjectClick={handleObjectClick}
            />
            <h3 className="m-2 font-bold">属性选择区</h3>
            <AttributeSection
              attributes={Object.keys(tagsData[activeObject])}
              selectedAttribute={activeAttribute}
              onAttributeClick={handleAttributeClick}
            />
            <h3 className="m-2 font-bold">标签选择区</h3>
            <TagSection
              tags={tagsData[activeObject][activeAttribute]}
              selectedTags={selectedTags}
              onTagClick={(tag) => handleTagClick(tag, activeAttribute)}
            />

            <h3 className="m-2 font-bold">当前选中</h3>
            <SelectedTagsSection
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
            />
          </Col>
          <Col xs={24} lg={6}>
            <ResultSection
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              tagsData={tagsData}
            />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default App;
