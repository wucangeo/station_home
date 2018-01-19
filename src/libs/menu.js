let menu = {
  station: [{
      name: "stationIntroduce",
      title: "台站简介",
      children: []
    },
    {
      name: "stationHistory",
      title: "历史沿革",
      children: []
    },
    {
      name: "stationRegulation",
      title: "规章制度",
      children: []
    }
  ],
  news: [{
      name: "newsList",
      title: "通知公告",
      params: {
        type: 1
      },
      children: []
    },
    {
      name: "newsList",
      title: "综合新闻",
      params: {
        type: 2
      },
      children: []
    },
    {
      name: "newsList",
      title: "科研动态",
      params: {
        type: 3
      },
      children: []
    },
    {
      name: "newsList",
      title: "服务动态",
      params: {
        type: 4
      },
      children: []
    },
    {
      name: "newsList",
      title: "合作交流",
      params: {
        type: 5
      },
      children: []
    },
    {
      name: "newsList",
      title: "科普活动",
      params: {
        type: 6
      },
      children: []
    },
    {
      name: "newsList",
      title: "专题报道",
      params: {
        type: 7
      },
      children: []
    },
  ],
  research: [{
      name: "achv",
      title: "科研成果",
      children: [{
          name: "paperAchvList",
          title: "科研论文",
          children: []
        },
        {
          name: "monographyAchvList",
          title: "专著",
          children: []
        },
        {
          name: "patentAchvList",
          title: "专利",
          children: []
        },
        {
          name: "awardsAchvList",
          title: "奖项",
          children: []
        },
      ]
    },
    {
      name: "project",
      title: "科研项目",
      children: [{
          name: "projectList",
          params: {
            type: 1
          },
          title: "科技部项目",
          children: []
        },
        {
          name: "projectList",
          params: {
            type: 2
          },
          title: "基金委项目",
          children: []
        },
        {
          name: "projectList",
          params: {
            type: 3
          },
          title: "中科院项目",
          children: []
        },
        {
          name: "projectList",
          params: {
            type: 4
          },
          title: "其他部委项目",
          children: []
        },
        {
          name: "projectList",
          params: {
            type: 5
          },
          title: "地方项目",
          children: []
        },
        {
          name: "projectList",
          params: {
            type: 6
          },
          title: "其他项目",
          children: []
        },
      ]
    },
  ],
  thematic: [{
      name: "thematicList",
      title: "生产与实践",
      params: {
        type: 4
      },
      children: []
    },
    {
      name: "thematicList",
      title: "服务科学研究",
      params: {
        type: 5
      },
      children: []
    },
  ],
}

export default menu