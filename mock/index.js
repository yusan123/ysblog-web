function Mock(app) {
  app.get('/tag/isExist', function(req, res) {
    res.json({
      'result': 'failed',
      'message': '该标签名已存在，不需要再创建',
      'data': null
    });
  });
  app.get('/blog/all', function(req, res) {
    res.json({
      'result': 'success',
      'message': '查询所有博客成功',
      'data': [
        {
          'id': '3f9fdbf763bc4d289731b1fccc0918ed',
          'title': '测试时间ok后1111111',
          'createTime': '2021-08-08 00:47:48',
          'updateTime': '2021-08-08 00:47:48',
          'context': '数据库配置ok后1111111-----context',
          'tags': [
            {
              'id': '22b8e6c3bd5e4c2da0d3d2158eb831c0',
              'name': '测试'
            },
            {
              'id': '7bd35d28b13544beaad49471193f3522',
              'name': '服务器'
            }
          ]
        },
        {
          'id': '8def23b4140d41a18ad013b10ec4d80d',
          'title': 'java基础知识总结',
          'createTime': '2021-08-08 08:13:18',
          'updateTime': '2021-08-08 08:13:18',
          'context': '8种基本类型',
          'tags': [
            {
              'id': 'c9050903cee84119bd5406999b98272b',
              'name': '后台'
            },
            {
              'id': '2b6800d104f14e76ae2a7a6badbded0d',
              'name': 'java'
            }
          ]
        }
      ]
    });
  });
  app.get('/tag/all', function(req, res) {
    res.json({
      'result': 'success',
      'message': '查询所有标签.',
      'data': [
        {
          'id': 'c9050903cee84119bd5406999b98272b',
          'name': '后台'
        },
        {
          'id': '2b6800d104f14e76ae2a7a6badbded0d',
          'name': 'java'
        },
        {
          'id': '22b8e6c3bd5e4c2da0d3d2158eb831c0',
          'name': '测试'
        },
        {
          'id': '7bd35d28b13544beaad49471193f3522',
          'name': '服务器'
        }
      ]
    });
  });
}
module.exports = Mock;
