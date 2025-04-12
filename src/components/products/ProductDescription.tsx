
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDescription() {
  return (
    <div className="mt-12">
      <Tabs defaultValue="description">
        <TabsList className="w-full border-b border-gray-200 pb-0">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (120)</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="py-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Product Overview</h3>
            <p>
              Experience premium sound quality with these wireless Bluetooth headphones. 
              Designed for comfort and style, they feature advanced noise cancellation 
              technology that blocks out ambient noise so you can focus on your music. 
            </p>
            <p>
              With up to 30 hours of battery life, you can enjoy your favorite tunes 
              all day long. The sleek and lightweight design makes them perfect for 
              travel, commuting, or just relaxing at home.
            </p>
            <h3 className="text-xl font-bold">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Active Noise Cancellation technology</li>
              <li>30-hour battery life</li>
              <li>Bluetooth 5.0 connectivity</li>
              <li>High-quality built-in microphone for calls</li>
              <li>Comfortable over-ear design with memory foam ear cups</li>
              <li>Foldable design for easy storage and travel</li>
              <li>Voice assistant compatibility (Siri, Google Assistant)</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Bluetooth Version</td>
                    <td className="py-2">5.0</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Battery Life</td>
                    <td className="py-2">Up to 30 hours</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Charging Time</td>
                    <td className="py-2">2.5 hours</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Driver Size</td>
                    <td className="py-2">40mm</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Frequency Response</td>
                    <td className="py-2">20Hz - 20kHz</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Weight</td>
                    <td className="py-2">250g</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">In the Box</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wireless Headphones</li>
                <li>USB-C Charging Cable</li>
                <li>3.5mm Audio Cable</li>
                <li>Carrying Case</li>
                <li>User Manual</li>
                <li>Warranty Card</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-4">Warranty Information</h3>
              <p>
                This product comes with a 2-year manufacturer's warranty covering 
                defects in materials and workmanship under normal use.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="py-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Customer Reviews</h3>
              <button className="btn-primary">Write a Review</button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Rating summary */}
              <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl font-bold">4.5</span>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Based on 120 reviews</p>
                  </div>
                </div>
                
                {/* Rating bars */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <span className="text-sm w-8">{rating} star</span>
                      <div className="flex-grow mx-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-yellow-400 h-full rounded-full" 
                          style={{ 
                            width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm w-8 text-right">
                        {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Review list */}
              <div className="w-full md:w-2/3 space-y-4">
                {/* Sample reviews */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">John D.</h4>
                    <span className="text-gray-500 text-sm">2 days ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700">
                    Absolutely love these headphones! The sound quality is amazing and the noise 
                    cancellation works really well. Battery life is impressive too - I've been 
                    using them for several days without needing to charge.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Sarah M.</h4>
                    <span className="text-gray-500 text-sm">1 week ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700">
                    These are great headphones with excellent sound quality. The only reason I'm not 
                    giving 5 stars is that they get a bit uncomfortable after wearing them for a few 
                    hours. Otherwise, they're perfect!
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Michael R.</h4>
                    <span className="text-gray-500 text-sm">3 weeks ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700">
                    I've tried many wireless headphones, and these are by far the best. The sound quality 
                    is outstanding, and the noise cancellation works wonders on my daily commute. 
                    Highly recommended!
                  </p>
                </div>
                
                <button className="btn-secondary mt-4 w-full">Load More Reviews</button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="py-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
              <p className="mb-2">
                We ship to most countries worldwide via our shipping partners. Delivery times vary 
                depending on your location and the shipping method selected at checkout.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Standard Shipping: 3-7 business days (Free on orders over $50)</li>
                <li>Express Shipping: 1-3 business days ($9.99)</li>
                <li>Next Day Delivery: Available for orders placed before 1 PM ($14.99)</li>
              </ul>
              <p className="mt-2 text-sm text-gray-500">
                Please note that delivery times are estimates and may vary due to unforeseen circumstances.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Return Policy</h3>
              <p className="mb-2">
                We want you to be completely satisfied with your purchase. If for any reason you're not 
                happy, we offer a hassle-free 30-day return policy.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Items must be returned in their original packaging and in new, unused condition</li>
                <li>Return shipping costs are the responsibility of the customer unless the item is defective</li>
                <li>Refunds are processed within 5-7 business days after we receive the returned item</li>
                <li>For defective products, we offer free replacement or full refund including shipping costs</li>
              </ul>
              <p className="mt-2">
                To initiate a return, please contact our customer service team at support@nexshop.com 
                or through our Contact Us page.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
