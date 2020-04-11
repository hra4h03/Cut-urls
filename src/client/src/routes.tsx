import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './views/LinksPage'
import { CreateLinks } from './views/CreateLinks'
import { DetailPage } from './views/DetailPage'
import { Auth } from './views/Auth'
export const useRoutes = (isAuthenticated: boolean): JSX.Element => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreateLinks />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}