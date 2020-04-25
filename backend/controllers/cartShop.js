const Cart = require('../models/cartShop')


exports.addItem = (req, res) => {
//   console.log({ BODY: req.body });
 

const user = req.profile._id
const product = {
 id:req.product._id,
 name:req.product.name
}

Cart.findOne({ user: user })
    .then((foundCart) => {
      if (foundCart) {
        let products = foundCart.items.map((item) => item.product + '');
        if (products.includes(item.product)) {
          Cart.findOneAndUpdate({
            user: user,
            items: {
              $elemMatch: { product: item.product }
            }
          },
            {
              $inc: { 'items.$.quantity': item.quantity }
            })
            .exec()
            .then(() => res.end());
        } else {
          foundCart.items.push(item);
          foundCart.save().then(() => res.end());
        }
      } else {
        Cart.create({
          user: user,
          items: [item]
        })
          .then(() => res.end());
      }
    });
};

   
  
  //   const user = req.profile._id
  //  const product = {
  //    id:req.product._id,
  //    name:req.product.name
  //  }
  //  console.log(product)
  
  //  Cart.findOne({user:user}).then(data =>{
  //    if(data){
  //      let products = data.items.filter(item=>item)
  //      return res.json({productos: products})
  //    } else {
  //      Cart.create().e
  //    }
  //  })
   
  //   console.log({user:user,product:product})
  
  // }
    
  

// Cart.findOne({ user: user })
//     .exec((err,foundCart) => {
//       if(err){
//         console.log(err)
//       }
//       if (foundCart) {
//         console.log(foundCart)
//         let products = foundCart.items.map((item) => item.product + '');
//         if (products.includes(item.product)) {
//           Cart.findOneAndUpdate({
//             user: user,
//             items: {
//               $elemMatch: { product: item.product }
//             }
//           },
//             {
//               $inc: { 'items.$.quantity': item.quantity }
//             })
//             .exec()
//             .then(() => res.end());
//         } else {
//           foundCart.items.push(item);
//           foundCart.save().then(() => res.end());
//         }
//       } else {
//         Cart.create({
//           user: user,
//           items: [item]
//         })
//           .then(() => res.end());
//       }
//     });
//   }
  

 