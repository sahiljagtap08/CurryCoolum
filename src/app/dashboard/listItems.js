import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { DashboardContext } from '../context/DashboardContext';
import { useContext, useState  } from 'react';


export default function ListItems({topics}) {
  const [open, setOpen] = React.useState(true);

  const context = useContext(DashboardContext);

  const handleClick = (topic) => {
    context.setCurrent(topic)
    context.setQuestionActive(false)
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <h1 style={{padding: '20px'}} component="div" id="nested-list-subheader">
          Topics to be covered
        </h1>
      }
    >
      {topics?.map((topic, index) => {
        return(
          <div key={index}>
            <ListItemButton  onClick={() => handleClick(topic)}>
              <ListItemIcon>
                <PlayCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={topic.heading} />
            </ListItemButton>
          </div>
        )
      })}
    </List>
  );
}