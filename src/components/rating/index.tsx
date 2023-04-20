import React from "react";

interface RatingProps {
  rating: number,
  total: number
}

const Rating = (props: RatingProps) => {

  const { rating, total } = props;

  let ratingInteger = rating ? Number(rating) : 0
  let ratingMapping = [1, 2, 3, 4, 5]
  if (total && total !== ratingMapping.length) {
      ratingMapping = []
      for (let i = 1; i <= total; i++) {
        ratingMapping.push(i)
      }
  }

  return (
    <>
      <div className="rating">
          {
              ratingMapping?.map((item) => {
                  return (
                      <div key={item}>
                          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill={`${item <= ratingInteger ? '#e19725' : '#E5E5E5'}`}>
                              <g>
                                  <path d="M0,0h24v24H0V0z" fill="none" />
                                  <path d="M0,0h24v24H0V0z" fill="none" />
                              </g>
                              <g>
                                  <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
                              </g>
                          </svg>
                      </div>
                  )
              })
          }
      </div>
      <style jsx>
        {`
          .rating {
            display: flex;
            margin: 10px 0;
          }
          .rating .checked {
            color: #da254e;
          }
          .rating .disabled{
            color: #E5E5E5;
          }
        `}
      </style>
    </>
  )

}

export default Rating