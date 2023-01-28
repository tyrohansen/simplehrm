import React from 'react'
import Badge from 'react-bootstrap/Badge'

function BadgeWidget(props) {
  const { text } = props;
  const color = () => {
       if(["Dropped"].includes(text)){
            return "danger"
       }else if(["Suspended","Inactive"].includes(text)){
           return "warning"
       }else if(["Pending","Unverified","Draft"].includes(text)){
        return "secondary"
       }else if (["Active","Completed","Complete","Closed", "Approved"].includes(text)){
          return "success"
       }else{
          return "primary"
       }
  }
  return (
    
    <Badge pill bg={color()}>
      {text}
    </Badge>
  );
}

export default BadgeWidget;