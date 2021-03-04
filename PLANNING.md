# Planning Document
## Roll4Initiative

Roll4Initiative is a DND campaign tracker. Users can track their campaigns by logging their notes and can load previous notes to see what is happening on their campaign as they play.

### User Stories

- As a user I want to sign in/up
- As a user I want to change my password
- As a user I want to sign out
- As a user I want to Create a new Campaign
- As a user I want to Read multiple Campaigns
- As a user I want to Read a single Campaign
- As a user I want to Update a Campaign I own
- As a user I want to Delete a Campaign I own
- As a user I want to Create a new Session in a campaign
- As a user I want to Read multiple Sessions
- As a user I want to Read a single Session
- As a user I want to Update a Session I own
- As a user I want to Delete a Session I own

## Resources
### Users

<table>
<tr>
  <th colspan="4">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Headers</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
<td>POST</td>
<td>/sign-up</td>
<td>credentials</td>
<td>empty</td>
<td>201, Created</td>
<td>user</td>
</tr>
<tr>
<td>POST</td>
<td>/sign-in</td>
<td>credentials</td>
<td>empty</td>
<td>200 OK</td>
<td>user w/token</td>
</tr>
<tr>
<td>DELETE</td>
<td>/sign-out</td>
<td>empty</td>
<td>token</td>
<td>201 Created</td>
<td>empty</td>
</tr>
<tr>
<td>PATCH</td>
<td>/change-password</td>
<td>passwords</td>
<td>token</td>
<td>204 No Content</td>
<td>user w/token</td>
</tr>
<tr>
  <th colspan="6">Response Errors</th>
</tr>
<tr>
  <th colspan="4">Description</th>
  <th colspan="1">Status</th>
  <th colspan="1">Body</th>
</tr>
<tr>
  <td colspan="4">Invalid incoming request data</td>
  <td>400 Bad Request</td>
  <td>Error object</td>
</tr>
<tr>
  <td colspan="4">Missing or invalid Authorization token</td>
  <td>401 Unauthorized</td>
  <td>Unauthorized message</td>
</tr>
</table>


### Campaigns
<table>
<tr>
  <th colspan="4">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Headers</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
<td>POST</td>
<td> /campaigns</td>
<td>{}</td>
<td>token</td>
<td>201, Created</td>
<td>campaign Obj</td>
</tr>
<tr>
<td>GET</td>
<td>/campaigns</td>
<td>n/a</td>
<td>token</td>
<td>200, OK</td>
<td>campaigns Obj</td>
</tr>
<td>GET</td>
<td>/campaigns/:id</td>
<td>n/a</td>
<td>token</td>
<td>200, OK</td>
<td>campaign Obj</td>
</tr>
<tr>
<td>DELETE</td>
<td>/campaigns/:id</td>
<td> n/a </td>
<td>token</td>
<td>200, Ok</td>
<td>n/a</td>
</tr>
</tr>
<tr>
<td>PATCH</td>
<td>/campaigns/:id</td>
<td>campaign data</td>
<td>token</td>
<td>200, Ok</td>
<td>campaign Obj</td>
</tr>
<tr>
  <th colspan="6">Response Errors</th>
</tr>
<tr>
  <th colspan="4">Description</th>
  <th colspan="1">Status</th>
  <th colspan="1">Body</th>
</tr>
<tr>
  <td colspan="4">Invalid incoming request data</td>
  <td>400 Bad Request</td>
  <td>Error object</td>
</tr>
<tr>
  <td colspan="4">Missing or invalid Authorization token</td>
  <td>401 Unauthorized</td>
  <td>Unauthorized message</td>
</tr>
</table>

### Sessions
<table>
<tr>
  <th colspan="4">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Headers</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
<td>POST</td>
<td> /campaigns/:id/sessions</td>
<td>{}</td>
<td>token</td>
<td>201, Created</td>
<td>session Obj</td>
</tr>
<tr>
<td>GET</td>
<td>/campaigns/:id/sessions</td>
<td>n/a</td>
<td>token</td>
<td>200, OK</td>
<td>sessions Obj</td>
</tr>
<td>GET</td>
<td>/campaigns/:id/sessions/:id</td>
<td>n/a</td>
<td>token</td>
<td>200, OK</td>
<td>session Obj</td>
</tr>
<tr>
<td>DELETE</td>
<td>/campaigns/:id/sessions/:id</td>
<td>session data</td>
<td>token</td>
<td>200, Ok</td>
<td>session Obj</td>
</tr>
</tr>
<tr>
<td>PATCH</td>
<td>/campaigns/:id/sessions/:id</td>
<td>session data</td>
<td>token</td>
<td>200, Ok</td>
<td>session Obj</td>
</tr>
<tr>
  <th colspan="6">Response Errors</th>
</tr>
<tr>
  <th colspan="4">Description</th>
  <th colspan="1">Status</th>
  <th colspan="1">Body</th>
</tr>
<tr>
  <td colspan="4">Invalid incoming request data</td>
  <td>400 Bad Request</td>
  <td>Error object</td>
</tr>
<tr>
  <td colspan="4">Missing or invalid Authorization token</td>
  <td>401 Unauthorized</td>
  <td>Unauthorized message</td>
</tr>
</table>



### Wireframes and ERD
![wireframe](../roll4-client/public/images/wf_home.png)
![wireframe](../roll4-client/public/images/wf_signin.png)
![wireframe](../roll4-client/public/images/wf_campaign.png)
![wireframe](../roll4-client/public/images/wf_session.png)

![ERD](../roll4-client/public/images/erd.png)
![ERD](../roll4-client/public/images/erd_routes.png)
![ERD](../roll4-client/public/images/erd_documents.png)



### Planning
1.  [ ] Review [full-stack-project-practice](https://git.generalassemb.ly/ga-wdi-boston/full-stack-project-practice)
1.  [ ] Review [full-stack-project-modeling-lab](https://git.generalassemb.ly/ga-wdi-boston/full-stack-project-modeling-lab)
1.  [ ] Create User Stories
1.  [ ] Create Wire Frames
1.  [ ] Create ERD

### Set Up

API

1.  [ ] [Download Express API Template](https://git.generalassemb.ly/ga-wdi-boston/express-api-template)
1.  [ ] Create a Github Repository
1.  [ ] [Deploy to Heroku](https://git.generalassemb.ly/ga-wdi-boston/express-api-deployment-guide)

Client

1.  [ ] [Download Browser Template](https://git.generalassemb.ly/ga-wdi-boston/browser-template)
1.  [ ] Create a Github Repository
1.  [ ] [Deploy to Github Pages](https://git.generalassemb.ly/ga-wdi-boston/gh-pages-deployment-guide)

### API
1.  [ ] Review [express-api-crud](https://git.generalassemb.ly/ga-wdi-boston/express-api-crud), [express-api-relationships](https://git.generalassemb.ly/ga-wdi-boston/express-api-relationships), and [express-api-auth](https://git.generalassemb.ly/ga-wdi-boston/express-api-auth)
1.  [ ] CRUD your resource
1.  [ ] Test your resource's end points with curl scripts
1.  [ ] Add the relationship to a User
1.  [ ] Add User ownership to resource controller
1.  [ ] Test your resource's end points with curl scripts

### Client
1.  [ ] Review [api-token-auth](https://git.generalassemb.ly/ga-wdi-boston/api-token-auth)
1.  [ ] Sign Up (curl then web app)
1.  [ ] Sign In (curl then web app)
1.  [ ] Change Password (curl then web app)
1.  [ ] Sign Out (curl then web page)
1.  [ ] All API calls have success or failure messages
1.  [ ] Review [query-ajax-post](https://github.com/ga-wdi-boston/jquery-ajax-post)
1.  [ ] Create resource (curl then web app)
1.  [ ] Get all of their owned resources (curl then web app)
1.  [ ] Delete single resource (curl then web app)
1.  [ ] Update single resource (curl then web app)

### Final Touches
1.  [ ] README
2.  [ ] Troubleshoot/Debug
3.  [ ] Style
