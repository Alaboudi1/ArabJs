import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const snippets = [
  `اطبع.نص("اهلاً بالعالم")`
  // 
  ,
  `
// متتالية فيبوناتشي

داله متتالية_فيبوناتشي (رقم)
{  
  اذا (رقم <= 1 )
  	الجواب رقم
  الجواب  متتالية_فيبوناتشي (رقم - 1) +  متتالية_فيبوناتشي(رقم - 2)
}
لنفرض مصفوفة = [1,2,3,4,5]

مصفوفة.لكل(عنصر => اطبع.نص("الرقم:" ,عنصر ," النتيجة: ", متتالية_فيبوناتشي(عنصر)))
`
  // 
  ,
  // 
  `
// ترتيب الدول حسب نسبة الوفاة استناداً
//على الاصابة بفيروس كورونا المستجد  
لنفرض الرابط = "https://covid19-api.com/country/all?format=json"
لنفرض حمل_المعلومات = (الرابط) => حمل(الرابط).ثم(البيانات => البيانات.الى_جيسون())
لنفرض نقح_البيانات = (البيانات) => البيانات.نقح(({country,confirmed,deaths}) => ({الدولة : country , نسبة_الوفاة :deaths/confirmed*100}))
لنفرض صفي_البيانات = (البيانات) => البيانات.صفي(({نسبة_الوفاة}) => !رقمي(نسبة_الوفاة))
لنفرض رتب_الدول = (الدول) => الدول.رتب((الاصغر, الاكبر) => الاصغر.نسبة_الوفاة - الاكبر.نسبة_الوفاة)

حمل_المعلومات(الرابط)
		.ثم(نقح_البيانات)
		.ثم(صفي_البيانات)
		.ثم(رتب_الدول)
		.ثم(الدول=> اطبع.جدول(الدول))
		.فشل(الخطأ => اطبع.خلل(الخطأ))

`
  //
  ,
  //
  `

  // ترتيب الدول حسب نسبة الوفاة استناداً
  //على الاصابة بفيروس كورونا المستجد  
  لنفرض الرابط = "https://covid19-api.com/country/all?format=json"
  لنفرض حمل_المعلومات = (الرابط) => حمل(الرابط).ثم(البيانات => البيانات.الى_جيسون())
  لنفرض نقح_البيانات = (البيانات) => البيانات.نقح(({country,confirmed,deaths}) => ({الدولة : country , نسبة_الوفاة :deaths/confirmed*100}))
  لنفرض صفي_البيانات = (البيانات) => البيانات.صفي(({نسبة_الوفاة}) => !رقمي(نسبة_الوفاة))
  لنفرض رتب_الدول = (الدول) => الدول.رتب((الاصغر, الاكبر) => الاصغر.نسبة_الوفاة - الاكبر.نسبة_الوفاة)
  لنفرض دول_الخليج = (الدول) => الدول.صفي(({الدولة}) => ["Saudi Arabia", "Qatar", "UAE" , "Bahrain", "Kuwait", "Oman"].يوجد(الدولة) )
  لنفرض d3 = مجهول
  
  
  استورد ("https://unpkg.com/d3?module")
    .ثم(المكتبة =>d3 = المكتبة)
    .ثم(_=> حمل_المعلومات(الرابط))
    .ثم(نقح_البيانات)
    .ثم(صفي_البيانات)
    .ثم(رتب_الدول)
    .ثم(دول_الخليج)
    .ثم(الدول => نمذج_البيانات(الدول))
    .فشل(الخطأ => اطبع.خلل(الخطأ))
  
    لنفرض نمذج_البيانات = (الدول) => {
       margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
      
       x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
       y = d3.scaleLinear()
                .range([height, 0]);
                
       svg = d3.select(".myChart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
      
      
        // format the data
      
        // Scale the range of the الدول in the domains
        x.domain(الدول.map((d)=>  d.الدولة));
        y.domain([0, d3.max(الدول, (d)=> d.نسبة_الوفاة )]);
      
        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(الدول)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d)=>  x(d.الدولة))
            .attr("width", x.bandwidth())
            .attr("y", (d)=> y(d.نسبة_الوفاة ))
            .attr("height", (d)=>  height - y(d.نسبة_الوفاة ));
      
        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
      
        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }
  `
  
  ];


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function CodeSnipts({ onCodeChange }) {
  const classes = useStyles();
  const [snippet, setSnippet] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setSnippet(event.target.value);
    const index  = event.target.value;
    onCodeChange(snippets[index], index === 3 ? "DOM": "console")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        أختر برنامج
      </Button>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={snippet}
          onChange={handleChange}
        >
          <MenuItem value={0}>اهلاً بالعالم</MenuItem>
          <MenuItem value={1}>متتالية فيبوناتشي</MenuItem>
          <MenuItem value={2}>ترتيب الدول على حسب نسبة الوفياة بكورونا</MenuItem>
          <MenuItem value={3}>نمذجة نسبة الوفياة للدول العربية</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
