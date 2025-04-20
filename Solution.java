import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        int size = 5;

        System.out.println();
        
        int[][] financial_obligation = new int[size][4]; // id deadline cost penalty
        
        // User input
        System.out.println("Enter the financial obligations for 5 jobs:");
        System.out.println("___________________");
        for(int i=0; i<size; i++) {
            System.out.println("For Job "+(i+1)+":");
            financial_obligation[i][0] = i+1;

            System.out.println();

            System.out.print("Deadline = ");
            financial_obligation[i][1] = input.nextInt();

            System.out.println();

            System.out.print("Cost = ");
            financial_obligation[i][2] = input.nextInt();

            System.out.println();

            System.out.print("Penalty = ");
            financial_obligation[i][3] = input.nextInt();

            System.out.println("___________________");
        }

        input.close();

        int best_case_total_cost = 0;
        for(int i=0; i<size; i++) {
            best_case_total_cost += financial_obligation[i][2];
        }

        int[][] working = new int[size][5]; // id deadline cost penalty (cost x penalty)
        // Filling the values for working array
        for(int i=0; i<size; i++) {
            working[i][0] = i+1; // id
            working[i][1] = financial_obligation[i][1]; // deadline
            working[i][2] = financial_obligation[i][2]; // cost
            working[i][3] = financial_obligation[i][3]; // penalty
            working[i][4] = financial_obligation[i][2] * financial_obligation[i][3]; // cost x penalty
        }

        // Sorting the working array in descending order of (cost x penalty)
        Arrays.sort(working, (a,b) -> b[4] - a[4]);

        // Evaluating maximum deadline 
        int max_deadline = 0;
        for(int i=0; i<size; i++) {
            if(working[i][1] > max_deadline) {
                max_deadline = working[i][1];
            }
        }

        // Pay days till the maximum deadline
        int[] pay_days = new int[max_deadline];
        // Initializing all the pay days to -1 
        for(int i=0; i<max_deadline; i++) {
            pay_days[i] = -1;
        }

        ArrayList<Integer> jobs_not_on_time = new ArrayList<>(); 

        int total_cost = 0;
        for(int i=0; i<size; i++) {
            int id = working[i][0];
            int deadline = working[i][1];
            int cost = working[i][2];
            int penalty = working[i][3];
            boolean isJobAllotted = false;

            for(int j=deadline-1; j>=0; j--) {
                if(pay_days[j] == -1) {
                    pay_days[j] = id;
                    total_cost += cost;
                    isJobAllotted = true;

                    break;
                }
            }

            if(! isJobAllotted) {
                jobs_not_on_time.add(id);
                total_cost += (cost * penalty);
            }
        }

        System.out.println("Job Allotted for the pay days from day 1 to day "+max_deadline+" are:");

        for(int i=0; i<max_deadline; i++) {
            System.out.println("~ Pay day "+i+" : "+pay_days[i]);
        }
        System.out.println("___________________");
        System.out.println("Jobs which are not completed before deadline are: ");

        for(int i=0; i<jobs_not_on_time.size(); i++) {
            System.out.println("~ Job "+jobs_not_on_time.get(i));
        }

        System.out.println("___________________");
        System.out.println("Total Cost to be paid according to the proposed pay days = Rs. "+total_cost);

        System.out.println("___________________");
        System.out.println("Extra Cost to be paid according to the penalty rates for undone jobs = Rs. "+(total_cost - best_case_total_cost));

        System.out.println();
    }
}