import Vue from 'vue';
// import App from '../App.vue';
import VueRouter from 'vue-router';
import CreateBlog from '../components/CreateBlog.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Category from '../components/Category.vue';
import Comment from '../components/Comment.vue';
import Blogs from '../components/Blogs.vue';
import BlogsList from '../components/BlogsList';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default new VueRouter({
  routes: [
    {
      path: '',
      name: HelloWorld,
      component: HelloWorld,
      redirect: '/blogs',
      children: [
        {
          path: 'category',
          name: Category,
          component: Category
        },
        {
          path: 'comment',
          name: Comment,
          component: Comment
        },
        {
          path: 'blogs',
          name: Blogs,
          component: Blogs
        }
      ]
    },
    {
      path: '/create',
      name: CreateBlog,
      component: CreateBlog
    },
    {
      path: '/blogList',
      name: BlogsList,
      component: BlogsList
    }
  ],
  mode: 'history'
});
