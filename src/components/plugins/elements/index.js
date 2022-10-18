import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/packages/theme-chalk/lib/index.css';
import { Button, Card, Form, FormItem, Select, Option, Alert, Input, Dialog, Icon, Dropdown, DropdownItem, DropdownMenu, Checkbox,Tag } from 'element-ui';

const elements = [Button, Card, Form, FormItem, Select, Option, Alert, Input, Dialog, Icon, Dropdown, DropdownItem, DropdownMenu, Checkbox, Tag];

locale.use(lang);

elements.forEach((element) => Vue.use(element, { locale }));
