from multiprocessing import Pool, cpu_count

with open('1-100000000.txt', encoding='utf-8') as current_file:
  pi = current_file.read()


def process_range(start_end):
    """Process a range of numbers, checking if each is a power of 10, and return a list of such numbers."""
    start, end = start_end
    print(f'Checking {start} to {end}')
    result = []
    for i in range(start, end):
      if f'{i}' not in pi:
        result.append(f'{i}')
    return result

def main():
    total_numbers = 100_000_000
    num_processes = cpu_count() - 1  # Adjust based on your CPU, or use multiprocessing.cpu_count() to use all available cores

    # Calculate the ranges for each process to handle
    ranges = [(i, min(i + total_numbers // num_processes, total_numbers + 1)) for i in range(1, total_numbers + 1, total_numbers // num_processes)]

    with Pool(processes=num_processes) as pool:
        # Use pool.map to process each range. Each process will return its list of numbers that are powers of 10.
        results = pool.map(process_range, ranges)
        
        # Flatten the list of lists to get a single list of numbers that are powers of 10
        powers_of_10 = [number for sublist in results for number in sublist]
        result = {}
        for number in powers_of_10:
          if len(number) not in result:
            result[len(number)] = 0
          result[len(number)] += 1
        print(result)

if __name__ == "__main__":
    main()